import {Routes,Route} from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Layout from "./components/Layout"
import Project from "./pages/project"
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>

        <Route element={<ProtectedRoutes/>}>

        <Route element={<Layout/>}>

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/teams/:id" element={<Project/>}/>
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App