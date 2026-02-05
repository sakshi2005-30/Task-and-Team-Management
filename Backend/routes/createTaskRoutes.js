const express=require("express");
const router=express.Router();

const protect=require("../middleware/authMiddleware");
const {createTask}=require("../controllers/createTaskController");

router.post("/task/:id",protect,createTask);

module.exports=router;