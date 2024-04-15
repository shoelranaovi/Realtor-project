import { getAuth,  updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import data from "../firebase";

function Profile() {
  const auth = getAuth();     // take the auth from firebase
  const navigate = useNavigate();   //take the navigate from react router dom 
  // eslint-disable-next-line no-unused-vars
  const [fromData, setFromData] = useState({       // a state from react auth data
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });


  const { name, email } = fromData;      // distrack the data for simple use 
  const [changeDetail, setChangeDetail]=useState(false)   // a state for change the from 

  function signOut() {                                 //the singout function 
    auth.signOut();
    navigate("/");
  }
 
    function onchange(e){                 // the onchange function for on change value
      setFromData((prev)=>({
        ...prev,
        [e.target.id]:e.target.value
      }))

    } 
   async function applyChange(){              /// the apply change function 
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser,{
          displayName:name ,
        })

        //update on firestore
        const docref=doc(data,"users",auth.currentUser.uid)
        await updateDoc(docref,{
         name:name,
          // if we want we can use only name .
        })
        toast.success("success")
        
      }
      
    } catch (error) {
      toast.error("some error ouccr")   // set the error
      
    }
      
    }
  return (
    <div className="flex justify-center  flex-col items-center gap-6  ">
      <div className="heading text-3xl">Your Profile</div>
      <div className={`input-list flex flex-col gap-4 w-[350px] lg:w-[550px] `}>
        <input
          type="text"
          id="name"
          value={name}
          className={`border-1px w-full ${changeDetail && "bg-red-300"} `}
          disabled ={!changeDetail}
          onChange={onchange}
        />
        <input
          type="email"
          value={email}
          className="border-1px w-full "
          disabled
        />
        <div className="eidid flex justify-between ">
          <div className="flex  gap-2">
            <p className="flex flex-col lg:flex-row">
              Do you Change your Name ?{" "}
              <span onClick={()=>{
                changeDetail && applyChange()
                setChangeDetail(!changeDetail)
              }} className="text-red-600 cursor-pointer">  {changeDetail ? "Apply Change" : "Edit"} </span>
            </p>
          </div>
          <p onClick={signOut} className=" cursor-pointer text-blue-700">
            Sign Out
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
