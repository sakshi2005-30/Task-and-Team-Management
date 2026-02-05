const Team=require("../models/CreateTeam")
const createTeam=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({
                message:"all fileds are required"
            })
        }
        const team=await Team.create({
            name,
            owner:req.user.id,
            members:[req.user.id]
        })
        res.status(201).json(team);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}

const getTeams=async(req,res)=>{
    try{
        const teams=await Team.find({
            members:req.user.id
        });
        res.status(200).json(teams);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}
module.exports={createTeam,getTeams}