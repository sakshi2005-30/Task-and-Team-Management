import api from "./api"

export const createTask=(id,data)=>{
    return api.post(`/team/task/${id}`,data);
}
export  const getTasks=(id)=>{
    return api.get(`/team/task/${id}`);
}
export const updateTask=(id,data)=>{
    return api.put(`/team/task/${id}`,data);
}
export const deleteTask=(id)=>{
    return api.delete(`/team/task/${id}`)
}