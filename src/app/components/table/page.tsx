'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { auth } from '../../../../firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
function page(state:any) {
    const [count,setCount]=useState([])
    const route=useRouter()
    const GET_User=async()=>{
 await axios
   .get("../../api/users", {
     params: { Mail: state.email },
   })
   .then((res: any) => {
     const { data } = res;
     setCount(data.URLS);
     console.log(data, count);
     console.log(auth.currentUser?.email);
   })
   .catch((error: any) => {
     alert(error);
   });
    }
    useEffect(()=>{
         GET_User()
    },[])
  return (
    <div>
      <table className="table-auto border-separate border-spacing-2 border border-slate-400 w-full">
        <thead>
          <tr className="table-row">
            <th className="border border-slate-300">Long URLS</th>
            <th className="border border-slate-300">Short URLS</th>
            <th className="border border-slate-300">Clicks</th>
            <th className="border border-slate-300">Edit</th>
            <th className="border border-slate-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {count.length==0? (
            <tr>
              <td className="text-center">No Data Record</td>
              <td className="text-center">No Data Record</td>
              <td className="text-center">No Data Record</td>
              <td className="text-center">No Data Record</td>
              <td className="text-center">No Data Record</td>
            </tr>
          ) : (
                count?.map(((e:any)=>{
                    return (
                      <>
                        <tr className="table-row">
                          <td className="border border-slate-300">{e.long}</td>
                          <td className="border border-slate-300">
                            <Link
                              target="_blank"
                              href={"./link/"}
                            >
                              {e.short}
                            </Link>
                          </td>
                          <td className="border border-slate-300">{e.Click}</td>
                          <td className="border border-slate-300">
                            <button>Edit</button>
                          </td>
                          <td className="border border-slate-300">
                            <button>Delete</button>
                          </td>
                        </tr>
                      </>
                    );
                }))
              
            
          )}
        </tbody>
      </table>
    </div>
  );
}

export default page