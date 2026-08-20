const express=require("express")
const router=express.Router()
const signup_m=require("../middleware/userMiddleware/signup_m")
const userSignUpController=require("../controller/userController/userSignUpController")
const login_m=require("../middleware/userMiddleware/login_m")
const userLoginController=require("../controller/userController/userLoginController")

router.post("/signup",signup_m,userSignUpController)
router.post("/login",login_m,userLoginController)
module.exports=router;