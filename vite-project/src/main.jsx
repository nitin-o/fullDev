import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './Router.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'



const router = Router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>  
    </Provider>  
  </StrictMode>,
)
