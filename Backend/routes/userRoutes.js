const express=require("express");
const router=express.Router();
const {registerUser,loginUser,refresh,logout}=require("../controllers/userController")
const User = require("../models/User");
const adminMiddleware=require("../middleware/adminmiddleware")
const protect=require("../middleware/authMiddleware")
router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/me",protect,async(req,res)=>{
    const user=await User.findById(req.user.id).select("-password");
    res.json(user);
})
router.post("/refresh",refresh);
router.post("/logout",logout);
module.exports=router;