import { Outlet } from "react-router"
import Header from "./Page/Header/Header"
import { useState ,useEffect } from "react";
import { useDispatch } from "react-redux";
import userService from "./DataBase/config";
import { login,logout } from "./store/authSlice";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.isLogin();
  
        if (!userData) {
          dispatch(logout());  //false
          
        }
        if (userData) {
          dispatch(login(userData));
        }
          
          

      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData()
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-white text-lg">Loading, please wait...</p>
        </div>
      </div>
    );
  }


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
