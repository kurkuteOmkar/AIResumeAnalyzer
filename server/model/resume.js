const mongoose=require("mongoose")
const resumeSchema=new mongoose.Schema({
    resume:{
        type:String,required:true
    }
})
const resumeModel=mongoose.model("resumeModel",resumeSchema)
module.exports=resumeModel
