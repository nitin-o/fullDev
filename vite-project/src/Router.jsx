import { createBrowserRouter } from "react-router";
import App from "./App";
import { Profile ,Home, Registrar, Login, Admin, Devise, Dashboard} from "./Page/Outlet/inext";


const Router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {
        path:"/",
        element:<Home/>
        },
        {
          path:"Profile",
          element:<Profile/>,
          children:[
            {
              path:"Admin",
              element:<Admin/>
            },
          ]
        },
        {
          path:"Registrar",
          element:<Registrar/>
        },
        {
          path:"Login",
          element:<Login/>
        },
        {
          path:"Admin",
          element:<Admin/>
        },{
          path:"Dashboard",
          element:<Dashboard/>
        }
       

      ],
    }
  ])


  export default Router