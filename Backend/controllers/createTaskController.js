const Task=require("../models/createTask");
const Team=require("../models/CreateTeam");
const Project=require("../models/CreateProject");
const createTaskValidation=require("../validation/taskValidation")

const createTask=async(req,res,next)=>{
    try{
        const {id}=req.params;
        // const {title,description,priority,assignedTo}=req.body;
        const data=createTaskValidation.parse(req.body)
        
        //check if project exists
        const project=await Project.findOne({_id:id}).populate("teamId")
        if(!project){
            throw new Error("Project doesn't eixts")
        }
        console.log(project)

        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
             throw new Error("Not authorized to add task");
        }

        //create tassk
        const task=await Task.create({
            title:data.title,
            description:req.body.description,
            status:data.status,
            priority:data.priority,
            assignedTo:req.body.assignedTo,
            projectId:id,
            createdBy:req.user.id
        })
        res.status(201).json(task)

    }
    catch(error){
        console.log(error);
        next(error)
    }
}

const getAllTasks=async(req,res,next)=>{
    try{
        //get project id
        const {id}=req.params;
        //check if project exists
        const project=await Project.findOne({_id:id}).populate("teamId");
        if(!project){
             throw new Error("Project doesn't eixts");
        }

        //check if the team contains the current user to fetch tasks
        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
            throw new Error("Not authorized to add task");
        }

        //get all tasks
        const tasks=await Task.find({projectId:id});
        res.status(200).json(tasks);

    }
    catch(error){
        console.log(error);
       next(error)

    }
}
const updateTask=async(req,res,next)=>{
    try{
        //get task id
        const {id}=req.params;
        //get task 
        const task=await Task.findOne({_id:id});

        if(!task){
             throw new Error("Project doesn't eixts");
        }
        //check if project exists
        const project=await Project.findOne(task.projectId).populate("teamId");
        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
            throw new Error("Not authorized to add task");
        }
        const updatedTask=await Task.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.status(200).json(updatedTask);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}
const deleteTask=async(req,res,next)=>{
    try{
        //get the atsk id
        const {id}=req.params;
        const task=await Task.findOne({_id:id});

        if(!task){
          throw new Error("Task not present")
        }
        //fidn project
        const project=await Project.findOne(task.projectId).populate("teamId");

        const team=project.teamId;
        if(!team.members.includes(req.user.id)){
             throw new Error("Not authorized to add task");
        }
        const delTask=await Task.findByIdAndDelete(id);
        res.status(200).json(delTask)

    }
    catch(error){
        console.log(error);
         next(error);

    }
}
const getModifiedTasks=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {page=1,limit=10,status,priority,search}=req.query;

        const project=await Project.findOne({_id:id});
        console.log("proje:",project)

        if(!project){
             throw new Error("Project doesn't exists");
        }
        const team=await Team.findOne({_id:project.teamId});
        console.log("team:",team)
        if(!team.members.includes(req.user.id)){
             throw new Error("Not authorized to add task");
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
           next(error);

    }
}

module.exports={createTask,getAllTasks,updateTask,deleteTask,getModifiedTasks};