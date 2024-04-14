import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import data from "../firebase";


function SingUp() {
  const [show, setShow] = useState(true);
  const [fromdata, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = fromdata;
  const navigate=useNavigate()


  function onchange(e) {
    setFromData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
 

  function settingshow() {
    setShow((prev) => !prev);
    console.log("hlw");
  }

  async function onsubmit(e){
    e.preventDefault()
    if(name===""|| email==="" || password===""){
      toast.error("something went wrong")
    }
    if( email.indexOf(".com") === -1){
      toast.error("something went wrong")
    }
    try {
       const auth=getAuth()
       const userCredential=await createUserWithEmailAndPassword(auth,email,password)    //create user
       updateProfile(auth.currentUser,{
        displayName:name             // update the name in firebase
      })
       const user=userCredential.user
       console.log(user);

       const fromdatatcopy={...fromdata}                       // create a copy user data

      //  delete fromdatatcopy.password                            //delete the password
       fromdatatcopy.timestamp=serverTimestamp()                //set time stamp

      await setDoc(doc(data,"users",user.uid),fromdatatcopy)   // set data to server
       
      navigate("/")
    } catch (error) {
      toast.error("something went wrong")
    }
  }
  return (
    <div>
      <h1 className="text-center text-2xl">Sing In </h1>
      <section className="m-2 flex flex-wrap md mt-8 md:justify-center items-center gap-4 ">
        <div className="left w-full md:w-[55%] lg:[60%] ">
          <img
            className="w-full rounded-xl"
            src="https://plus.unsplash.com/premium_photo-1661775953246-410e3a33977c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="right flex flex-col   w-full md:w-[55%] lg:w-[38%] lg:ml-2 ">
          <form onSubmit={onsubmit} className="w-full mb-6">
            <input
              type="text"
              id="name"
              value={name}
              onChange={onchange}
              placeholder=" Enter your Full name"
              className="w-full mb-6"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onchange}
              placeholder="Enter your Email Here"
              className="w-full mb-6"
            />
            <div className="password relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                value={password}
                onChange={onchange}
                placeholder="Enter your Password Here"
                className="w-full"
              />
              {show ? (
                <FaEyeSlash
                  onClick={settingshow}
                  className="absolute top-3 right-2 cursor-pointer  "
                  size={20}
                />
              ) : (
                <FaEye
                  onClick={settingshow}
                  className="absolute cursor-pointer top-3 right-2"
                  size={25}
                />
              )}
            </div>
            <div className="forget-singin flex mt-4 justify-between lg:flex-col xl:flex-row">
              <div className="register flex flex-wrap ">
                
                <Link to={"/SingIn"} className="text-red-600 ">
                <p>Already have an Account?</p>
                </Link>
              </div>
              <div className="forget-pass text-blue-700">
                <Link to={"/ForgetPassword"}>Forget your Password</Link>
              </div>
            </div>
            <button onClick={onsubmit} className="w-full mt-6 mb-4 bg-blue-900 text-white text-lg p-2">
              {" "}
              SING UP{" "}
            </button>
            <h2 className="text-center mb-3">OR</h2>
            <Auth />
          </form>
        </div>
      </section>
    </div>
  );
}

export default SingUp;
