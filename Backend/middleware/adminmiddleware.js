const adminMiddleware=async(req,res,next)=>{
        
    if(req.user.role!=="admin"){
        return res.status(401).json({
            message:"Only admin access allowed"
        })
    }
    next();
    
}
module.exports=adminMiddleware;