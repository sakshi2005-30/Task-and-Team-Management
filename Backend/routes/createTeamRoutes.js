const express=require("express");
const router=express.Router();
const {createTeam,getTeams}=require("../controllers/createTeamController");
const protect=require("../middleware/authMiddleware");

router.post("/",protect,createTeam);
router.get("/",protect,getTeams)
module.exports=router;