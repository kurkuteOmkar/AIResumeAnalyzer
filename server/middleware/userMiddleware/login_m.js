const Joi=require("joi")
const loginScheme=Joi.object({
email:Joi.string().email().min(12).required(),
password:Joi.string().min(4).required()
})
const login_m=(req,res,next)=>{
const {error}=loginScheme.validate(req.body);
if(error){
  return   res.status(409).json({message:error.details[0].message})
}
next();
}
module.exports=login_m