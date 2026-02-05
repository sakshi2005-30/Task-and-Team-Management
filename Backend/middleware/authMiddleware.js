const jwt=require("jsonwebtoken");

const protect=async(req,res,next)=>{
    const token=req.cookies.accessToken;
        if(!token){
            return res.status(401).json({
                message:"Not authenticated"
            })
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user=decoded;
            next();
        }
         catch(error){
            console.log(error)
            res.status(500).json({message:"Authorization error"});
        }
}
module.exports=protect;