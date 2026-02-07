import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";


const ProtectedRoutes = ({children}) => {

    const {user,loading}=useAuth();
    if(loading){
        return <p className="flex justify-center items-center min-h-screen text-2xl font-bold ">Loading...</p>
    }
    if(!user){
        return <Navigate to="/login"/>
    }
  return children;
    
  
}

export default ProtectedRoutes