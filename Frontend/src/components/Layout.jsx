import { Outlet } from "react-router"
const Layout = () => {
  return (
    <div>
        <header></header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout