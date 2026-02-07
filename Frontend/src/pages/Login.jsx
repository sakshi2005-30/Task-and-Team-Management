import { useState } from "react"
import {getMe, loginUser} from "../services/authApi"
import {useAuth} from "../context/AuthContext"
import { Link, useNavigate } from "react-router"
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const {setUser} =useAuth()
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await loginUser({email,password});
    const user=await getMe();
    console.log("res:",user);
     setUser(user)
    navigate("/dashboard")
    }
    catch(err){
      console.log(err)
    }
    
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className=" border bg-white max-w-md  rounded-lg border-gray-100 shadow-md py-4 px-4 ">
        <div className="flex flex-col items-center justify-center space-y-2 px-12 py-6 ">
          <p className="text-2xl font-medium">Welcome back</p>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="px-6 py-4 flex flex-col space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-col ">
            <p className="text-sm font-semibold">Email</p>
            <input
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100 placeholder:text-sm"
            />
          </label>
          <label htmlFor="email" className="text-col ">
            <p className="text-sm font-semibold">Password</p>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100 placeholder:text-sm"
            />
          </label>
          <button className="w-full text-center bg-black text-white px-4 py-2 text-sm hover:bg-black/80 font-medium rounded-lg ">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 my-2 ">Don't have and account?<Link to="/register" className="text-blue-500">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login