
import { getAuth } from 'firebase/auth'
import { useState } from 'react'

function Profile() {
  const auth =getAuth()
   // eslint-disable-next-line no-unused-vars
   const [fromData,setFromData]=useState({
     name: auth.currentUser.displayName,
     email:auth.currentUser.email
   })
   console.log(auth.currentUser);

   const{name,email}=fromData

  return (
    <div className='flex justify-center  flex-col items-center gap-6  '>
      <div className="heading text-3xl">Your Profile</div>
      <div className="input-list flex flex-col gap-4 w-[350px] lg:w-[550px] ">
        <input type="text" value={name} className='border-1px w-full ' disabled  />
        <input type="email" value={email} className='border-1px w-full ' disabled   />
        <div className="eidid flex justify-between"  >
          <div className='flex gap-2'>
            <p>Do you Change your Name ? <span className='text-red-600'> Edit </span></p>
          </div>
           <p className=' text-blue-700'>Sign Out</p>
        </div>
      </div>

    </div>
  )
}

export default Profile