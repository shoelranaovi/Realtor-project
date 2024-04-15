
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import data from "../firebase";
import { useNavigate } from "react-router-dom";
 

 function Auth() {
  const navigate=useNavigate()
  async function onGoggleClick(){
    const auth = getAuth()
    const provider= new GoogleAuthProvider()
    
    try {
      const result= await signInWithPopup(auth,provider)
    const user=result.user
    console.log(user);

    // check the database
    const docref= doc(data,"users",user.uid)
    //                 db  , collection name
    const docsnp=await getDoc(docref)
    if(!docsnp.exists()){
      await setDoc(docref,{
        name:user.displayName,
        email:user.email,
        timestmp:serverTimestamp()
      })
      
      
    }
    
   
    } catch (error) {
      toast.error("some error")
    }

    navigate("/") 
  }
  return (
    <div>
        <button type="button"  onClick={onGoggleClick} className="w-full bg-red-800 p-2 text-lg ">  <div className="flex justify-center text-white items-center gap-3"> <FaGoogle className="  text-white rounded-xl "size={20} /> CONTINUE WITH GOOGLE</div> </button>
    </div>
  )
}

export default Auth