import { Navigate, Outlet } from "react-router-dom"

import  { useAuthStatus } from "../Hooks/AuthHook";

import Spiner from "./Spiner";

export default function PrivateRoute() {
    
    const{logIn,loding}=useAuthStatus()
    
    
   
    if (loding) {
        return  <Spiner />
        
    }
   
  return logIn ? <Outlet /> : <Navigate to="/SingIn" />   
}

