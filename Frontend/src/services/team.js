import api from "./api";

export const createTeam=(data)=>{
    return api.post("/team",data);
}
export const getTeams=()=>{
    return api.get("/team")
}