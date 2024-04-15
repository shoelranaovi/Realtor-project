import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"


export function useAuthStatus() {
    const [logIn,setLogIn]=useState(false)
    const [loding,SetLoding]=useState(true)

    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth,(user=>{
            if(user){
                setLogIn(true)
            }
            SetLoding(false)
        }),[])
    })

  return {logIn,loding};
}

