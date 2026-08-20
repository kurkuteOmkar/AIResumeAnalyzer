const Joi=require("joi")

const  signupSchema=Joi.object({
    username:Joi.string().min(3).max(30).required(),
    email:Joi.string().min(12).email().max(30).required(),
    password:Joi.string().min(4).required()
})
const signup_m=(req,res,next)=>{
    const {error}=signupSchema.validate(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    next();
    }
    module.exports=signup_m