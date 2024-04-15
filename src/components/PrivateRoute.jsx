import { Navigate, Outlet } from "react-router-dom"

import  { useAuthStatus } from "../Hooks/AuthHook";
import Auth from "./Auth";
import { getAuth } from "firebase/auth";


export default function PrivateRoute() {
    const auth = getAuth()
    const{logIn,loding}=useAuthStatus()
    
    
   
    if (loding) {
        return <h1> loading </h1>
        
    }
   
  return logIn ? <Outlet /> : <Navigate to="/SingIn" />
}

