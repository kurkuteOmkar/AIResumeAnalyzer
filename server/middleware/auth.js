const jwt=require("jsonwebtoken")
require("dotenv").config();
const authMiddleware=(req,res,next)=>{
try{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(400).json({
            success:false,
            message:'Access Denied no token Provided'
        })
    }
    const token=authHeader.split(" ")[1];
    const decode=jwt.verify(token,process.env.jwt_secret_key)
    req.user=decode
    next()
}
catch(error){
return res.status(400).json({
    success:false,
    message:"Invalid or expired token"
})
}
}
module.exports=authMiddleware