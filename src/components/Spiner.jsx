import Spinner from "../Assets/svg/Spinner.svg"

export default function Spiner(){
    
    return(
        <div className=" fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-30 ">
            <img src={Spinner} className="text-gray-950" alt="" />
        </div>
    )
}