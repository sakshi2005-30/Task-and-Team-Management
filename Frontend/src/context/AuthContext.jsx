import { createContext,useContext,useState,useEffect } from "react";
import { getMe } from "../services/authApi";
const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res=await getMe();
                console.log("auth:",res)
                 setUser(res);
                
            }
            catch(error){
                console.log(error);
                setUser(null);
               
            }
            finally{
                 setLoading(false);
            }
        }
        fetchUser();
    },[])

    return (
        <AuthContext.Provider value={{user,setUser,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);



