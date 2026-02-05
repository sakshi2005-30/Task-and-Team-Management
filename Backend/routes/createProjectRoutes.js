const express=require("express");
const router=express.Router();

const protect=require("../middleware/authMiddleware");
const {createProject,getProjects}=require("../controllers/createProjectController")

router.post("/project/:id",protect,createProject);

router.get("/project/:id", protect,getProjects);
module.exports=router;