import { Outlet } from "react-router"
import Header from "./Page/Header/Header"


function App() {
  
  



  return (
    <>
    <div className="bg-gray-900  border-gray-700 rounded-b-sm h-screen flex flex-col">
      <Header/>
      <div className="bg-gray-900 border-2 border-gray-700 rounded-b-sm h-full w-screen">
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default App
