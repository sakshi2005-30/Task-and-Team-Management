// create projects but only inside a team
const mongoose=require("mongoose");
const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true});
module.exports=mongoose.model("Project",projectSchema);