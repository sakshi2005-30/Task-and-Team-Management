import api from "./api";

export const createProject=(id,data)=>{
    return api.post(`/team/project/${id}`,data);
}

export const getProjects=(id)=>{
    return api.get(`/team/project/${id}`)
}