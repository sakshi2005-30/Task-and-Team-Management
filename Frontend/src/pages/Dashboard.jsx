import {useState,useEffect} from "react";
import { createTeam,getTeams } from "../services/team";
import {Users} from "lucide-react"
import { Link } from "react-router";
const Dashboard = () => {
  const [team,setTeam]=useState([]);
  const [name,setName]=useState("");
  const [openCreate,setOpenCreate]=useState(false);

  useEffect(()=>{
    const fetchTeams=async()=>{
      try{
        const res=await getTeams();
        setTeam(res.data);
      }
      catch(err){
        console.log(err)
      }
    }
    fetchTeams();
  },[])
  console.log("team:",team);
 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await createTeam({name});
    setTeam((prev)=>[...prev,res.data]);
   
      setOpenCreate(false)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="">
      <div className="max-w-3xl mx-auto px-6  py-10">
        <div className="flex justify-between items-center relative">
          <div className="flex flex-col space-y-2 ">
            <h1 className="text-2xl font-medium">Teams</h1>
            <p className="text-gray-500">Manage your teams</p>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-black/80"
            onClick={() => setOpenCreate(true)}
          >
            Create team
          </button>
          {openCreate && (
            <div className="absolute right-0 top-20 border rounded-lg border-gray-200 shadow-md bg-white z-10">
              <form
                className="px-6 py-4 flex flex-col space-y-6  "
                onSubmit={handleSubmit}
              >
                <label htmlFor="name" className="text-col ">
                  <p className="text-sm font-semibold">Team Name</p>
                  <input
                    type="text"
                    value={name}
                    placeholder="name@example.com"
                    onChange={(e) => setName(e.target.value)}
                    className=" ring-2 ring-transparent focus-within:ring-gray-300 w-full mt-1 px-4 py-2 outline-none rounded-lg bg-gray-100/6 placeholder:text-sm border border-gray-300"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <button
                    className=" text-center px-4 py-2 border border-gray-300 text-sm hover:bg-black/10 font-medium rounded-lg "
                    onClick={() => setOpenCreate(false)}
                  >
                    Cancel
                  </button>
                  <button className=" text-center bg-black text-white px-4 py-2 border text-sm hover:bg-black/80 font-medium rounded-lg ">
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div>
          {team.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mg:gap-8 lg:grid-cols-4 lg:gap-6 my-18 ">
              {team.map((item) => (
                <Link
                  to={`/dashboard/teams/${item._id}`}
                  key={item._id}
                  className="border px-8 py-6 rounded-lg border-gray-300 hover:shadow-md flex-col space-y-4 bg-white"
                >
                  
                    <p className="text-lg font-medium">{item.name}</p>
                    <div className=" text-gray-500 flex space-x-1 items-center">
                      <Users className="h-4 w-4" />
                      <p className="text-sm">{item.members.length}</p>
                      <p className="text-sm">Members</p>
                    </div>
                  
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard