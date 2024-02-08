'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { auth } from '../../../../firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
function page(state:any) {
    const [count,setCount]=useState([])
    const [reload,setLoad]=useState(Number)
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
    const Edit=async(short:String)=>{
      const long=prompt("Enter Changing URL:")
      await axios
        .put("../../api/url", { short: short, long: long })
        .then((res) => {
          alert("URL Changed");
          setLoad(Math.random()*5);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const Delete = async (short: any) => {
      const long = confirm("Are you Sure ?");
      if(long){
        await axios
          .patch("../../api/url",{short:short})
          .then((res) => {
            alert("URL Deleted");
            setLoad(Math.random()*3);
          }).catch((err)=>{
            alert(err)
          })
      }
      
    };
    useEffect(()=>{
         GET_User()
    },[reload])
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
                              href={`https://anchorstask.vercel.app/link/${e.short}`}
                            >
                              {e.short}
                            </Link>
                          </td>
                          <td className="border border-slate-300">{e.Click}</td>
                          <td className="border border-slate-300">
                            <button onClick={event=>Edit(e.short)}>Edit</button>
                          </td>
                          <td className="border border-slate-300">
                            <button onClick={event=>Delete(e.short)}>Delete</button>
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