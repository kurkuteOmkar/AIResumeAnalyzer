import "./Register.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Register(){
   const [data,setData]=useState({
    username:"",
    email:"",
    password:""
   }) 
 const navigate=useNavigate()
   const handleRegister=async (e)=>{
    e.preventDefault()
    if(!data.email && !data.password && !data.username){
        alert("Please entered the email and password")
        return
    }
    if(!data.email){
    alert("Please entered the email")
    return
       }
       if(!data.password){
        alert("Please entered the password")
        return
       }
    if(!data.username){
        alert("Please entered the name")
        return
    }
    try{
    const response=await axios.post(`${import.meta.env.VITE_API_URLfeature}/signup`,data)
    if(response.status === 200 ){
        navigate("/login")
    }
    }catch(error){ 
        alert("Please enter the valid info")
    }
   }
   const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
   }
    return <>
    <div className="Register-container">
        <div className="Register-heading">Create an Account – Get Started Now
        </div>
        <div>
            <form action="" className="Register-form" onSubmit={handleRegister}>
            <div className="Register-FullName">
                <label htmlFor="">Enter Your Full Name </label><br/>
                <input type="text" onChange={handleChange} value={data.username} name="username"></input>
                </div>
                <div className="Register-emailAdd">
                <label htmlFor="">Email Address</label><br/>
                <input type="text" onChange={handleChange} value={data.email} name="email"></input>
                </div>
                <div className="Register-password">
                <label htmlFor=""> Password</label><br/>
                <input type="password" onChange={handleChange} value={data.password} name="password" />
                </div>
                <div className="Register-signIn">
                <button>Sign up</button>
                </div>
            </form>
        </div>
            <div className="Register-Signup"><p>Need an account?Sign up for free</p></div>
    </div>
    </>
}
export default Register