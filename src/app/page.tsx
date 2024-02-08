'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {auth} from '../../firebase'
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Home() {
  const [URL,setURL]=useState("")
   const route = useRouter();
    const [result, setResult] = useState(String);
    function generateRandomString(length: any) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      setResult(result)
      return result
    }
  const isValidUrl = () => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    
    return !!urlPattern.test(URL)
  };
  const URL_Request=async()=>{
    const check=isValidUrl()
    
    if(auth.currentUser?.email === undefined){

      toast.warn("Must Login to Short the URL")
    }else if(check){
      await axios
        .put("./api/users", {
          Mail: auth.currentUser.email,
          URLS: { long: URL, short: result },
        })
        .then((res) => {
          alert("Go to Dashboard View Sorted URL");
          setURL("")
        })
        .catch((error: any) => {
          console.log(error);
          console.log(error)
        });
    }else{
      toast.error("Check URL Format")
    }
  }
   const logout = async () => {
     await auth.signOut();
     route.push("/");
     route.refresh()
   };
   useEffect(()=>{
    setTimeout(()=>{ generateRandomString(6);},3000)
   })
  return (
    <main className="mt-10 justify-center">
      <ToastContainer />
      <div className="flex flex-row-reverse">
        {auth.currentUser?.email !== undefined ? (
          <div className="flex"><Link className="mt-4 mr-5" href={"/dashboard"}>Dashboard</Link><button
              onClick={logout}
              className="border-2 p-2 mt-2 mr-10 rounded-lg hover:bg-red-800 hover:text-white"
            >
              Logout
            </button></div>
        ) : (
          <Link href={"/login"} className="mr-10 hover:border-2 p-5">
            SignUP/Login
          </Link>
        )}
      </div>
      <h1 className="text-center">URL shortener application</h1>
      <div className="flex justify-center bg-slate-600 py-[10%] rounded-md px-10">
        <input
          placeholder="URL"
          className="h-5 p-5  rounded-2xl w-full"
          onChange={(e) => setURL(e.target.value)}
          value={URL}
        />
        <button
          onClick={(e) => URL_Request()}
          className=" ml-5 border-2 px-5 rounded-md hover:text-blue-600 hover:bg-blue-100"
        >
          Short
        </button>
      </div>
    </main>
  );
}
