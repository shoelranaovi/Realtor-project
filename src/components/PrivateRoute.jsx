import { Navigate, Outlet } from "react-router-dom"

import  { useAuthStatus } from "../Hooks/AuthHook";


export default function PrivateRoute() {
    
    const{logIn,loding}=useAuthStatus()
    
    
   
    if (loding) {
        return <h1> loading </h1>
        
    }
   
  return logIn ? <Outlet /> : <Navigate to="/SingIn" />
}

