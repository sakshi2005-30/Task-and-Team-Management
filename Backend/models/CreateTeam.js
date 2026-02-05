const mongoose=require("mongoose");

const createTeamSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    members:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
},{timestamps:true});
module.exports=mongoose.model("Team",createTeamSchema);