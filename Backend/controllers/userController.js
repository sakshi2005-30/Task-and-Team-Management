const User = require("../models/User");

const USer=require("../models/User")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name ||!email ||!password){
            return res.status(400).json({
                message:"All fileds are required"
            })
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already registered"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })

        res.status(201).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:'Server error'
        })
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email|| !password){
            return res.status(400).json({
                message:"All filedsa required"
            })
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User is not registered.Please register!"
            })
        }
        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({
                message:"Email or password is wrong"
            })
        }

        const accessToken=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"15m"});

        const refreshToken=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        // set cookie

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge:15*60*1000
        
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            sameSite:"lax",secure:false,
            maxAge:7*24*60*1000
        })

        res.status(200).json({
        message:"login successfull"

        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        })
    }
}

const refresh=async(req,res)=>{
    // console.log("res.cookies:",res.cookies)
    const token = req.cookies.refreshToken;
    
    if(!token){
        return res.status(401).json({
            message:"No refresh token"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const newAccessToken=jwt.sign({id:decoded.id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"});

        res.cookie("accessToken",newAccessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:"false",
            maxAge:15*60*1000
        })
        res.json({
            message:"Access token refreshed"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"No refresh token"
        })
    }
}
const logout=async(req,res)=>{
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({
        message:"Logout successfully"
    })
}
module.exports={registerUser,loginUser,refresh,logout};