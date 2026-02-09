import {Calendar, ChevronDown, Pen, Plus,Trash} from "lucide-react"
import { createTask,getTasks,updateTask,deleteTask } from "../services/task";
import {useState,useEffect} from "react";
import {useParams}  from "react-router"
const Task = () => {

  const [tasks,setTasks]=useState([]);
  const {id}=useParams();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [priority,setPriority]=useState("medium");
  const [addTaskOpen,setAddTaskOpen]=useState(false);
  const [priorityOpen,setPriorityOpen]=useState(false);
  const [update,setUpdate]=useState(false);
  const [updateId,setUpdateId]=useState(null);


  const [updateTitle,setUpdateTitle]=useState("");
  const [updateDescription,setUpdateDescription]=useState("");
  const [updatePriority,setUpdatePriority]=useState("");
  
  
  // console.log("id:",id);
  useEffect(()=>{
    const fetchTasks=async()=>{
     
      try{
        const res=await getTasks(id);
        setTasks(res.data);
        // console.log("task:",res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchTasks();
  },[]);

  const handleSubmit=async(e)=>{
     e.preventDefault();
    try{
      const res = await createTask(id, {
        title,
        description,
        priority,
        status: "todo",
        assignedTo: "69831c0ec36c2215ac807a2c",
      });
      setAddTaskOpen(false);
      console.log("task c:",res.data);

    }
    catch(err){
      console.log(err);
    }
  }
  const handleDelete=async(taskId)=>{
   
    try{
      const res=await deleteTask(taskId);
      console.log("del:",res.data);
      setTasks((prev)=>prev.filter((item)=>item._id!==taskId))
    }
    catch(err){
      console.log(err)
    }
  }
  const handleUpdate=async(e)=>{
     e.preventDefault();
    try{
      const res=await updateTask(updateId,{title:updateTitle,description:updateDescription,priority:updatePriority});
      console.log("u:",res.data);
      setUpdate(false);
      setTasks((prev)=>prev.map((item)=>item._id===updateId?res:item));
      setUpdateId(null);
      setAddTaskOpen(false);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2">
            <p className="text-2xl font-medium">Tasks</p>
            <p className="text-gray-500">Manage and track all your tasks</p>
          </div>
          <button
            className="flex space-x-2 px-4 py-2 items-center bg-black rounded-lg text-white font-medium hover:bg-black/80 text-sm"
            onClick={() => setAddTaskOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2 font-medium" />
            New Task
          </button>
        </div>

        {addTaskOpen && (
          <div className="inset-0 bg-black/10 fixed flex justify-center items-center py-10 ">
            <div className="bg-white  my-10 py-8 px-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
              <div className="flex flex-col space-y-2 ">
                <p className="text-lg font-medium">{update?"Update Task":"Create new Task"}</p>
                <p className="text-sm text-gray-500">
                 {update?"Update your task":" Add a new task to your project."}
                </p>
              </div>

              <form className="flex flex-col space-y-4 mt-8">
                <label htmlFor="name" className="text-col ">
                  <p className="text-sm font-semibold">Task Title</p>
                  <input
                    type="text"
                    value={update?updateTitle:title}
                    onChange={(e) => {
                      update?setUpdateTitle(e.target.value):setTitle(e.target.value);
                    }}
                    className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100/6 placeholder:text-sm border border-gray-300"
                  />
                </label>
                <label htmlFor="name" className="text-col ">
                  <p className="text-sm font-semibold">Description</p>
                  <textarea
                    rows="5"
                    type="text"
                    value={update?updateDescription:description}
                    onChange={(e) => {
                      update?setUpdateDescription(e.target.value):setDescription(e.target.value);
                    }}
                    className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100/6 placeholder:text-sm border border-gray-300"
                  />
                </label>
                <label htmlFor="priority" className="flex flex-col">
                  <p className="text-sm font-semibold">Priority</p>
                  <p
                    onClick={() => {{
                      update ? updatePriority : priority;
                    }
}}
                    className="bg-gray-100 w-30 text-center py-1  rounded-lg text-sm mt-2 font-medium flex justify-center items-enter"
                  >
                    {priority}{" "}
                    <ChevronDown className="w-4 h-4 my-1 ml-1 text-gray-500" />
                  </p>
                  {priorityOpen && (
                    <button className="border w-30  flex flex-col rounded-lg border-gray-300">
                      <p
                        className="py-1 px-4 hover:bg-gray-200 hover:rounded-lg"
                        onClick={() => {
                          update?setUpdatePriority("low"):setPriority("low");
                          setPriorityOpen(false);
                        }}
                      >
                        low
                      </p>
                      <p
                        className="py-1 px-4 hover:bg-gray-200 hover:rounded-lg"
                        onClick={() => {
                           update
                             ? setUpdatePriority("medium")
                             : setPriority("medium");
                          setPriorityOpen(false);
                        }}
                      >
                        medium
                      </p>
                      <p
                        className="py-1  
                      px-4 hover:bg-gray-200 hover:rounded-lg "
                        onClick={() => {
                           update
                             ? setUpdatePriority("high")
                             : setPriority("high");
                          setPriorityOpen(false);
                        }}
                      >
                        high
                      </p>
                    </button>
                  )}
                </label>
                <div className="flex space-x-4 justify-end">
                  <button
                    className=" text-center px-4 py-2 border border-gray-300 text-sm hover:bg-black/10 font-medium rounded-lg "
                    onClick={() => setOpenTask(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className=" text-center bg-black text-white px-4 py-2 border text-sm hover:bg-black/80 font-medium rounded-lg "
                    onClick={update?handleUpdate:handleSubmit}
                  >
                   {update?"Update Task":"Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="my-10">
        {tasks.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12 ">
            {tasks.map((item) => (
              <div
                key={item._id}
                className="border py-6 px-6 rounded-lg flex flex-col space-y-4 border-gray-300 bg-white"
              >
                <p className="text-lg font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex justify-between space-x-1">
                  <p className="font-medium text-sm px-2 py-1 bg-yellow-50 rounded-lg">
                    {item.priority}
                  </p>

                  <p className="flex items-center text-sm  text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-2 py-2 bg-green-200 rounded-lg  hover:bg-green-100" onClick={()=>{
                    setAddTaskOpen(true);
                    setUpdateTitle(item.title);
                    setUpdateDescription(item.description);
                    setUpdatePriority(item.priority)
                    setUpdate(true);
                    setUpdateId(item._id);
                  }}>
                    <Pen />
                  </button>
                  <button className="px-2 py-2 bg-red-300 rounded-lg  hover:bg-red-200" onClick={()=>handleDelete(item._id)}>
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Task