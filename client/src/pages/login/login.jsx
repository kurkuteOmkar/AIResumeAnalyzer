import "./login.css"
import { Link } from "react-router-dom"
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function login(){
   const [loginInfo,setLoginInfo]=useState({email:"",password:""})
   const navigate=useNavigate()
   const handleChange=(e)=>{
      setLoginInfo({
        ...loginInfo,[e.target.name]:e.target.value
      })
   }
   const handleSubmit=async (e)=>{
e.preventDefault()
if(!loginInfo.email && !loginInfo.password){
    alert("Please entered the email and password")
    return
}
if(!loginInfo.email){
alert("Please entered the email")
return
   }
   if(!loginInfo.password){
    alert("Please entered the password")
    return
   }
   if(loginInfo.password.length<4){
    alert("Invalid Password")
    return
   }
try{
   const response=await axios.post(`${import.meta.env.VITE_API_UR}/login`,loginInfo)
   console.log(response.data)
   if(!response.data.token){
    alert("Please login again")
    return
   }
   localStorage.setItem("token",response.data.token)
   localStorage.setItem("user",response.data.user)
   window.dispatchEvent(new Event("userLogin"));
   navigate("/")
}catch(error){
    alert("Please recheck and enter the valid info")
}
}
    return <>
    <div className="login-container">
        <div className="login-heading">Welcome! Please sign in or create a free acccount
        </div>
        <div>
            <form action="" className="login-form" onSubmit={handleSubmit}>
                <div className="login-emailAdd" >
                <label htmlFor="">Email Address</label><br/>
                <input type="text" onChange={handleChange} name="email" value={loginInfo.email}></input>
                </div>
                <div className="login-password">
                <label htmlFor="" value={loginInfo.password}> Password</label><br/>
                <input type="password" name="password" onChange={handleChange} value={loginInfo.password}/>
                </div>
                <div><p>forget password</p></div>
                <div className="login-signIn">
                <button>Sign In</button>
                </div>
            </form>
        </div>
            <div className="login-Signup"><Link to="/register">Need an account?Sign up for free</Link></div>
    </div>
    </>
}
export default login