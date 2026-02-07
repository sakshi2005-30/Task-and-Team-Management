import api from "./api"

export const registerUser=(data)=>{
 return api.post("/auth/register", data);
}
export const loginUser=(data)=>{
 return api.post("/auth/login", data);
}
export const logoutUser=(data)=>{
  return api.post("/auth/logout");
}
export const getMe=()=>{
    return api.get("/auth/me");
}