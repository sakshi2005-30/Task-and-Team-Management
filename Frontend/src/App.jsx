import {Routes,Route} from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App