'use client'
import React, { useCallback, useEffect } from 'react'
import {auth} from '../../../firebase'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Table from '../components/table/page'
import axios from 'axios';
import { memo } from 'react';
import Link from 'next/link';
function page() {
    const route=useRouter()
   const logout = async() => {
    await auth.signOut();    
     route.push('/')
   };
useEffect(()=>{
  //  if (
  //    auth.currentUser?.email === null ||
  //    auth.currentUser?.email === undefined
  //  ) {
  //    route.push("/login");
  //  }
})
   return (
    <><ToastContainer></ToastContainer><div>
       <div className="flex justify-between bg-black text-red-500 h-14">
         <div className="flex pt-4 pl-5">
           Welcome
           <p className='text-[20px] text-blue-700 ml-5'>{auth.currentUser?.displayName}</p>
         </div>
         <div className='mt-4'>
          <Link href={"/"}>Home</Link>
         </div>
         <div className="pr-10">
           <button
             onClick={logout}
             className="border-2 p-2 mt-2 rounded-lg hover:bg-red-800 hover:text-white"
           >
             Logout
           </button>
         </div>
       </div>
       <Table email={auth.currentUser?.email}/>
     </div>
     </>
   ); 
}

export default page