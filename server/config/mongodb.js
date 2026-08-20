const mongoose=require("mongoose");
require("dotenv").config();
const dbURI=process.env.MONGO_URL;

const dbConnection=async()=>{
    try{
        await mongoose.connect(dbURI)
        console.log("connection succesfull")
    }catch(err){
        console.log(err)
    }
}
module.exports=dbConnection;