import { useState } from "react";
import Spiner from "../components/Spiner";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import uuid from "react-uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import data from "../firebase";


function Createlisting() {
const auth=getAuth()
  const navigate =useNavigate()
  const [loading,setLoading]=useState(false)
  const [fromdata, setFromData] = useState({
    type: "rent",
    name: "",
    beds: 0,
    baths: 0,
    parking: true,
    furnish: true,
    address: "",
    description: "",
    Offer: true,
    price: 0,
    images: {},
  });

  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnish,
    address,
    description,
    Offer,
    price,
    images,
  } = fromdata;
  console.log(fromdata);
  function onchange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      ////most importent concept
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFromData((prev) => ({
        ...prev,
        images :e.target.files,
      }));
    }

    if (!e.target.files) {
      setFromData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
 async function onsubmit(e){
  e.preventDefault()
  setLoading(true)
 

 async function storeImage(image){
  return new Promise((resolve,reject)=>{
    const storage =getStorage()
    const filename= `${auth.currentUser.uid}-${image.name}-${uuid()}`;
    const storageRef=ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, image);


uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {reject(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      resolve(downloadURL)});
    
  }
);})
 
 }
 
 const imgUrls = await Promise.all(
  [...images].map((image) => storeImage(image))
).catch((error) => {
  console.log(error);
  setLoading(false);
  toast.error("Images not uploaded");
  return;
});

   const fromdatacapy={
    ...fromdata,
    imgUrls,
    timeStame:serverTimestamp(),
    userRef:auth.currentUser.uid,
   }
  delete fromdatacapy.images
  const doRef=await addDoc(collection(data,"listings"),fromdatacapy)
  setLoading(false);
  toast.success("Listing saved");
  navigate(`/category/${fromdata.type}/${doRef.id}`)

 }


 if (loading) {
  return <Spiner />
  
}

  return (
    <main className=" flex flex-col justify-center items-center ">
      <h1 className="text-3xl text-bold">Create a listing</h1>
      <form onSubmit={onsubmit} className=" w-[450px] mt-6 flex flex-col gap-4 ">
        <div className="box sell">
          <div className="header text-xl pb-2 ">Sell / Rent</div>
          <div className="item-container flex gap-4  ">
            <button
              type="button"
              value="sell"
              className={`item cursor-pointer rounded-lg w-[50%] p-4 shadow-lg ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              name="type"
              id="type"
              onClick={onchange}
            >
              {" "}
              SELL{" "}
            </button>
            <button
              type="button"
              value="rent"
              className={`item cursor-pointer rounded-lg w-[50%] p-4 shadow-lg ${
                type === "sell"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              name="type"
              id="type"
              onClick={onchange}
            >
              {" "}
              RENT{" "}
            </button>
          </div>
        </div>
        <div className="box name ">
          <div className="header text-xl pb-2 ">Name</div>
          <div className="item-container flex gap-4  ">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={onchange}
              className="item bg-white rounded-lg w-full p-3 shadow-lg "
              name="type"
              id="name"
            />
          </div>
        </div>
        <div className="box bed-bat flex gap-6  ">
          <div>
            <div className="header text-xl pb-2 ">Beds</div>
            <div className="item-container flex gap-4  ">
              <input
                type="number"
                name="beds"
                id="beds"
                value={beds}
                onChange={onchange}
                max="15"
                min="1"
                className=" w-[100px] p-3 rounded-md shadow-lg "
              />
            </div>
          </div>
          <div>
            <div className="header text-xl pb-2 ">Baths</div>
            <div className="item-container flex gap-4  ">
              <input
                type="number"
                name="beds"
                value={baths}
                id="baths"
                onChange={onchange}
                max="15"
                min="1"
                className=" w-[100px] p-3 rounded-md shadow-lg "
              />
            </div>
          </div>
        </div>
        <div className="box parking-spot">
          <div className="header text-xl pb-2 ">Parking spot</div>
          <div className="item-container flex gap-4  ">
            <button
              type="button"
              value={true}
              onClick={onchange}
              className={` ${
                !parking
                  ? "item cursor-pointer bg-white rounded-lg w-[50%] p-4 shadow-lg"
                  : "bg-black rounded-lg text-white w-[50%] p-4 shadow-lg"
              } `}
              name="type"
              id="parking"
            >
              {" "}
              YES{" "}
            </button>

            <button
              type="button"
              value={false}
              onClick={onchange}
              className={` ${
                parking
                  ? "item cursor-pointer bg-white rounded-lg w-[50%] p-4 shadow-lg"
                  : "bg-black rounded-lg text-white w-[50%] p-4 shadow-lg"
              } `}
              name="type"
              id="parking"
            >
              {" "}
              NO{" "}
            </button>
          </div>
        </div>
        <div className="box furnished">
          <div className="header text-xl pb-2 ">Furnished</div>
          <div className="item-container flex gap-4  ">
            <button
              type="button"
              value={true}
              onClick={onchange}
              className={` ${
                !furnish
                  ? "item cursor-pointer bg-white rounded-lg w-[50%] p-4 shadow-lg"
                  : "bg-black rounded-lg text-white w-[50%] p-4 shadow-lg"
              } `}
              name="type"
              id="furnish"
            >
              {" "}
              YES{" "}
            </button>

            <button
              type="button"
              value={false}
              onClick={onchange}
              className={` ${
                furnish
                  ? "item cursor-pointer bg-white rounded-lg w-[50%] p-4 shadow-lg"
                  : "bg-black rounded-lg text-white w-[50%] p-4 shadow-lg"
              } `}
              name="type"
              id="furnish"
            >
              {" "}
              NO{" "}
            </button>
          </div>
        </div>

        <div className="box address">
          <div className="header text-xl pb-2 ">Address</div>
          <div className="item-container flex gap-4  ">
            <input
              type="text"
              onChange={onchange}
              value={address}
              placeholder="Address"
              className="item  bg-white w-full py-6 rounded-lg text-black  p-4 shadow-lg "
              id="address"
            />
          </div>
        </div>
        <div className="box Description">
          <div className="header text-xl pb-2 ">Description</div>
          <div className="item-container flex gap-4  ">
            <input
              type="text"
              value={description}
              onChange={onchange}
              placeholder="Description"
              className="item  bg-white w-full py-6 rounded-lg text-black  p-4 shadow-lg "
              id="description"
            />
          </div>
        </div>
        <div className="box parking-spot">
          <div className="header text-xl pb-2 ">Offer</div>
          <div className="item-container flex gap-4  ">
            <button
              type="button"
              value={true}
              onClick={onchange}
              className={` ${
                !Offer
                  ? "item cursor-pointer bg-white rounded-lg w-[50%] p-4 shadow-lg"
                  : "bg-black rounded-lg text-white w-[50%] p-4 shadow-lg"
              } `}
              name="Offer"
              id="Offer"
            >
              {" "}
              YES{" "}
            </button>

            <button
              type="button"
              value={false}
              onClick={onchange}
              className={` ${
                Offer
                  ? "item cursor-pointer bg-white rounded-lg w-[50%] p-4 shadow-lg"
                  : "bg-black rounded-lg text-white w-[50%] p-4 shadow-lg"
              } `}
              name="type"
              id="Offer"
            >
              {" "}
              NO{" "}
            </button>
          </div>
        </div>
        <div className="box price">
          <div className="header text-xl pb-2 ">Regular price</div>
          <div className="item-container flex gap-4  ">
            <input
              type="text"
              value={price}
              onChange={onchange}
              placeholder="0"
              className="item  bg-white w-[250px]  rounded-lg text-black  p-4 shadow-lg "
              id="price"
            />
          </div>
        </div>
        <div className="box images">
          <div>Images</div>
          <div>
            <p>The frist Image will be cover (Max6)</p>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              multiple
              required
              onChange={onchange}
            />
          </div>
        </div>

        <button
          type="submit" onClick={onsubmit}
          className="w-full bg-blue-700 text-white mb-9 py-3  rounded-lg"
        >
          {" "}
          CREATE LISTING
        </button>
      </form>
    </main>
  );
}

export default Createlisting;
