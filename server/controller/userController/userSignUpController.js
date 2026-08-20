const bcrypt=require("bcrypt")
const userModel=require("../../model/user")
const userSignUpController=async(req,res)=>{
    const saltRounds=10;
       const {username,email,password}=req.body;
       try{
       const  existingUser=await userModel.findOne({email});
       if(existingUser){
        return res.status(409).json({message:"User already exist"})
       }
      const hashedPassword=await bcrypt.hash(password,saltRounds);
      const newUser=new userModel({username,email,password:hashedPassword})
      await newUser.save();
     return res.status(200).json({message:"User registered successfully"})
    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
    
}
module.exports=userSignUpController;