const userModel=require("../../model/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userLoginController=async(req,res)=>{
const {email,password}=req.body;
const user=await userModel.findOne({email})
if(!user){
  return  res.status(409).json({message:"User not found,You must Signup first"})
}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
  return  res.status(404).json({message:"Invalid credential"})
}
const token=jwt.sign(
  {id:user._id},
  process.env.jwt_secret_key,
  {expiresIn:"24h"}
)
return res.status(200).json({token,user:user.username})
}
module.exports=userLoginController