const errorHandler=async(error,req,res,next)=>{
    console.log(error);
    if(error.name==="ZodError"){
        return res.status(400).json({
            message:error.issues[0].message
        });
    }
    res.status(500).json({
        message:error.message || "Internal Server Error"
    })
}
module.exports=errorHandler