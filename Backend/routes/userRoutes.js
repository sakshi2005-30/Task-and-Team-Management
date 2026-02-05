const express=require("express");
const router=express.Router();
const {registerUser,loginUser,refresh,logout}=require("../controllers/userController")
const adminMiddleware=require("../middleware/adminmiddleware")
const protect=require("../middleware/authMiddleware")
router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/me",protect,(req,res)=>{
    res.json({
        message:"admin access done"
    })
})
router.post("/refresh",refresh);
router.post("/logout",logout);
module.exports=router;