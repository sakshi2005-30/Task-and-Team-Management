const Team=require("../models/CreateTeam")
const createTeamSchema=require("../validation/teamvalidation");
const createTeam=async(req,res,next)=>{
    try{
       const data=createTeamSchema.parse(req.body);
       
        const team=await Team.create({
            name:data.name,
            owner:req.user.id,
            members:[req.user.id]
        })
        res.status(201).json(team);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

const getTeams=async(req,res,next)=>{
    try{
        const teams=await Team.find({
            members:req.user.id
        });
        res.status(200).json(teams);
    }
    catch(error){
        console.log(error);
        next(error)
    }
}
module.exports={createTeam,getTeams}