const Project=require("../models/CreateProject");
const Team=require("../models/CreateTeam");

const createProject=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,description}=req.body;
        console.log("id",id);
        console.log("name:",name);
        if(!id || !name){
            return res.status(400).json({
                message:"All fields  are required"
            })
        }

        //check if the team exists
        const team=await Team.findOne({_id:id});
        if(!team){
           return res.status(400).json({
            message:"team doesn't exist"
           })
        }

        //check if the cureent user is the part of the team
        if(!team.members.includes(req.user.id)){
            return res.status(401).json({
                message:"You are not the member of team to create project"
            })
        }


        const project=await Project.create({
            name,
            description,
            teamId:id,
            createdBy:req.user.id
        })
        res.status(200).json(project);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
const getProjects=async(req,res)=>{
    try{
        const {id}=req.params;

        //check if team exists
         const team=await Team.findOne({_id:id});
         
        if(!team){
            return res.status(400).json({
                message:"No team exist"
            })
        }

        //check if user is authorized to get all teams
        if(!team.members.includes(req.user.id)){
            return res.status(401).json({
                message:"You are not a part of team to get projects"
            })
        }
        const projects=await Project.find({teamId:id});
        res.status(200).json(projects)
    }
    catch(error){
        console.log(error);
        res.status(500).json({
          message: "Server error",
        });
    }
}

module.exports={createProject,getProjects};