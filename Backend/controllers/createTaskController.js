const Task=require("../models/createTask");
const Team=require("../models/CreateTeam");
const Project=require("../models/CreateProject");

const createTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,priority,assignedTo}=req.body;

        if(!title){
            return res.status(400).json({
                message:"Title is required"
            })
        }
        //check if project exists
        const project=await Project.findOne({_id:id}).populate("teamId")
        if(!project){
            return res.status(400).json({
                message:"Project doesnt exists"
            })
        }
        console.log(project)

        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
            return res.status(401).json({
                message:"You are not a part of team to add task"
            })
        }

        //create tassk
        const task=await Task.create({
            title,
            description,
            priority,
            assignedTo,
            projectId:id,
            createdBy:req.user.id
        })
        res.status(201).json(task)

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}

module.exports={createTask};