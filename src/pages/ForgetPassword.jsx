import { useState } from "react"

import { Link } from "react-router-dom";


function ForgetPassword() {
 
  const[fromdata,setFromData]=useState("")
 
  

  function onchange(e){
    setFromData(e.target.value
    )
  
  }


 
  return (
   <div>
    <h1 className="text-center text-2xl">Reset Your Password </h1>
     <section className="m-2 flex flex-wrap md mt-8 md:justify-center items-center gap-4 ">
      <div className="left w-full md:w-[55%] lg:[60%] ">
        <img className="w-full rounded-xl" src="https://plus.unsplash.com/premium_photo-1661775953246-410e3a33977c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="right flex flex-col   w-full md:w-[55%] lg:w-[38%] lg:ml-2 ">
      <form className="w-full mb-4">
      <input type="email" id="email" value={fromdata} onChange={onchange} placeholder="Enter your Email Here" className="w-full mb-4" />
      
      <div className="forget-singin flex justify-between">
        <div className="register flex ">
         <p> Do not have an Account?</p> 
         <Link to={"/SingUp"} className="text-red-600 ml-2"> Register</Link>
        </div>
        <div className="singin text-blue-700">
          <Link to={"/SingIn"}>Sing In</Link>
        </div>
       
      </div>
      <button className="w-full mt-6 mb-4 bg-blue-900 text-white text-lg p-2"> SEND RESET PASSWORD </button>
    
      
      </form>
      </div>
    </section>
   </div>

  )
}

export default ForgetPassword