const Project=require("../models/CreateProject");
const Team=require("../models/CreateTeam");
const createProjectSchema=require("../validation/projectValidation")

const createProject=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const data=createProjectSchema.parse(req.body);
       
        //check if the team exists
        const team=await Team.findOne({_id:id});
        if(!team){
           throw new Error("Team doesn't exist")
        }

        //check if the cureent user is the part of the team
        if(!team.members.includes(req.user.id)){
             throw new Error("Not authorized to add task");
        }


        const project=await Project.create({
            name:data.name,
            description:data.description,
            teamId:id,
            createdBy:req.user.id
        })
        res.status(200).json(project);
    }
    catch(error){
        console.log(error);
        next(error)
    }
}
const getProjects=async(req,res,next)=>{
    try{
        const {id}=req.params;

        //check if team exists
         const team=await Team.findOne({_id:id});
         
        if(!team){
            throw new Error("Team doesn't exists")
        }

        //check if user is authorized to get all teams
        if(!team.members.includes(req.user.id)){
            throw new Error("Not authorized to add task");
        }
        const projects=await Project.find({teamId:id});
        res.status(200).json(projects)
    }
    catch(error){
        console.log(error);
       next(error);
    }
}

module.exports={createProject,getProjects};