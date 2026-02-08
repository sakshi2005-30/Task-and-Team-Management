import React from 'react'
import { useParams } from 'react-router'
import {useState,useEffect} from "react";
import { createProject,getProjects } from '../services/project';
import {Plus} from "lucide-react";
const Project = () => {
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    // const [teamId,setTeamId]=useState(null);
    const [openProject,setOpenProject]=useState(false);
    const [projects,setProjects]=useState([]);
    const {id}=useParams();
    const teamId=id;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await createProject(id,{name,description});
            console.log("res:",res);
            setProjects((prev)=>[...prev,res.data]);
            setOpenProject(false);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        const fetchProjects=async()=>{
            try{
                const res=await getProjects(teamId);
                setProjects(res.data);
                
                console.log("proj:",res.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchProjects();
    },[])
 
    //console.log(id)
      return (
        <div className="max-w-3xl mx-auto x-6 py-10">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col space-y-2">
              <p className="text-2xl font-medium">Projects</p>
              <p className="text-gray-500">
                Manage and track all your projects in one place
              </p>
            </div>
            <button
              className="flex  space-x-2 items-center px-4 py-2 bg-black text-white rounded-lg  text-sm hover:bg-black/90"
              onClick={() => setOpenProject(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> New Project
            </button>

            {openProject && (
              <div className="inset-0 bg-black/30 fixed flex justify-center  ">
                <div className="bg-white  my-10 py-8 px-6 rounded-lg shadow-md  ">
                  <div className="flex flex-col space-y-2 ">
                    <p className="text-lg font-medium">Create New Project</p>
                    <p className="text-sm text-gray-500">
                      Add a new project to organize your tasks and team.
                    </p>
                  </div>

                  <form className="flex flex-col space-y-4 mt-8">
                    <label htmlFor="name" className="text-col ">
                      <p className="text-sm font-semibold">Project Name</p>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100/6 placeholder:text-sm border border-gray-300"
                      />
                    </label>
                    <label htmlFor="name" className="text-col ">
                      <p className="text-sm font-semibold">Description</p>
                      <textarea
                        rows="5"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100/6 placeholder:text-sm border border-gray-300"
                      />
                    </label>
                    <div className="flex space-x-4 justify-end">
                      <button
                        className=" text-center px-4 py-2 border border-gray-300 text-sm hover:bg-black/10 font-medium rounded-lg "
                        onClick={() => setOpenProject(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className=" text-center bg-black text-white px-4 py-2 border text-sm hover:bg-black/80 font-medium rounded-lg "
                        onClick={handleSubmit}
                      >
                        Create Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>


          <div>
            {projects.length>0 &&(
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12 my-10">
                    {projects.map((item)=>(
                        <div key={item._id} className="border py-6 px-6 rounded-lg border-gray-300 bg-white hover:shadow-md ">
                            <p className="text-lg text-center font-medium">{item.name}</p>
                            <p className='text-sm text-gray-500'>{item.description}</p>
                         </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      );
}

export default Project