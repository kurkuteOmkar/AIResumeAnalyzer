const express=require("express")
const interviewquestionscontroller = require("../controller/interviewquestionscontroller")
const roadmapcontroller=require("../controller/roadmapcontroller")
const authentication=require("../middleware/auth")
const router=express.Router()

router.post("/interviewquestions",authentication,interviewquestionscontroller)
router.post("/roadmap",authentication,roadmapcontroller)

module.exports=router