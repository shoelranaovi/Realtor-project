
import { FaGoogle } from "react-icons/fa";

function Auth() {
  return (
    <div>
        <button className="w-full bg-red-800 p-2 text-lg ">  <div className="flex justify-center text-white items-center gap-3"> <FaGoogle className="  text-white rounded-xl "size={20} /> CONTINUE WITH GOOGLE</div> </button>
    </div>
  )
}

export default Auth