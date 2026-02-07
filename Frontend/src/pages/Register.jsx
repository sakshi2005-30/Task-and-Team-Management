import { useState } from "react"
import { useNavigate,Link } from "react-router"
import { registerUser } from "../services/authApi"
const Register = () => {
  const [form,setForm]=useState({});
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await registerUser(form);
      navigate("/login")
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className=" border bg-white max-w-md  rounded-lg border-gray-100 shadow-md py-4 px-4 ">
        <div className="flex flex-col items-center justify-center space-y-2 px-12 py-6 ">
          <p className="text-2xl font-medium">Create an account</p>
          <p className="text-gray-500 px-11">Enter your details to get started</p>
        </div>
        <form className="px-6 py-4 flex flex-col space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-col ">
            <p className="text-sm font-semibold">Name</p>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100 placeholder:text-sm"
            />
          </label>
          <label htmlFor="email" className="text-col ">
            <p className="text-sm font-semibold">Email</p>
            <input
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100 placeholder:text-sm"
            />
          </label>
          <label htmlFor="email" className="text-col ">
            <p className="text-sm font-semibold">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100 placeholder:text-sm"
            />
          </label>
          <button className="w-full text-center bg-black text-white px-4 py-2 text-sm hover:bg-black/80 font-medium rounded-lg ">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 my-2 ">
         Already have an account?
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register