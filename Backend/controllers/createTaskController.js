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

const getAllTasks=async(req,res)=>{
    try{
        //get project id
        const {id}=req.params;
        //check if project exists
        const project=await Project.findOne({_id:id}).populate("teamId");
        if(!project){
            return res.status(400).json({
                message:"This project doesn't exist"
            })
        }

        //check if the team contains the current user to fetch tasks
        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
            return res.status(403).json({
                message:"The team doesn't contain current user"
            })
        }

        //get all tasks
        const tasks=await Task.find({projectId:id});
        res.status(200).json(tasks);

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
const updateTask=async(req,res)=>{
    try{
        //get task id
        const {id}=req.params;
        //get task 
        const task=await Task.findOne({_id:id});

        if(!task){
            return res.status(400).json({
                message:"Task with id id doesn't exist"
            })
        }
        //check if project exists
        const project=await Project.findOne(task.projectId).populate("teamId");
        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
            return res.status(403).json({
                message:"You are not the part of team"
            })
        }
        const updatedTask=await Task.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.status(200).json(updatedTask);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
const deleteTask=async(req,res)=>{
    try{
        //get the atsk id
        const {id}=req.params;
        const task=await Task.findOne({_id:id});

        if(!task){
            return res.status(400).json({
                message:"Task not found with this id"
            })
        }
        //fidn project
        const project=await Project.findOne(task.projectId).populate("teamId");

        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
            return res.status(403).json({
                message:"Not a authorized user to delete task"
            })
        }
        const delTask=await Task.findByIdAndDelete(id);
        res.status(200).json(delTask)

    }
    catch(error){
        console.log(error);
        res.status(500).json({
          message: "Server error",
        });
    }
}
const getModifiedTasks=async(req,res)=>{
    try{
        const {id}=req.params;
        const {page=1,limit=10,status,priority,search}=req.query;

        const project=await Project.findOne({_id:id});
        console.log("proje:",project)

        if(!project){
            return res.status(400).json({
                message:"Project doesn't exist"
            })
        }
        const team=await Team.findOne({_id:project.teamId});
        console.log("team:",team)
        if(!team.members.includes(req.user.id)){
            return res.status(403).json({
                message:"you are not a part of team"
            })
        }

        const query={projectId:id}
        //add filtering
        if(status){
            query.status=status;
        }
        if(priority){
            query.priority=priority
        }

        //add search
        if(search){
            query.title={$regex:search,$options:"i"};
        }

        //add pagination
        console.log("query:",query)
        const task=await Task.find(query).skip((page-1)*(limit)).limit(Number(limit)).sort({createdAt:-1});
        const total=await Task.countDocuments(query);
        res.json({
            total,
            page:Number(page),
            pages:Math.ceil(total/limit),
            task
        });
    }
    catch(error){
          console.log(error);
          res.status(500).json({
            message: "Server error",
          });
    }
}

module.exports={createTask,getAllTasks,updateTask,deleteTask,getModifiedTasks};