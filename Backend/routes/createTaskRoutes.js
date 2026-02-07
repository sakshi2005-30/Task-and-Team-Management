const express=require("express");
const router=express.Router();

const protect=require("../middleware/authMiddleware");
const {createTask,getAllTasks,updateTask,deleteTask,getModifiedTasks}=require("../controllers/createTaskController");

router.post("/task/:id",protect,createTask);
router.get("/task/:id",protect,getAllTasks)
router.put("/task/:id",protect,updateTask)
router.delete("/task/:id",protect,deleteTask)
router.get("/task/modified/:id",protect,getModifiedTasks);
module.exports=router;