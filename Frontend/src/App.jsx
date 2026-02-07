import {Routes,Route} from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoutes from "./components/ProtectedRoutes"
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
      </Routes>
    </div>
  )
}

export default App