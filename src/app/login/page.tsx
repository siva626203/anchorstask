'use client'
import React from 'react'
import GoogleButton from "react-google-button";
import { auth, provider } from "../../../firebase";
import { useRouter } from "next/navigation";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
function page() {
    const route=useRouter()
    const Login = async() => {
      try {
        await auth.signInWithPopup(provider);
        await axios
          .post("http://localhost:3000/api/users", {
            Mail: auth.currentUser?.email,
            Name: auth.currentUser?.displayName,
          })
          .then((res: any) => {
            toast.success(res.data?.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            const e = auth.currentUser?.email;
           localStorage.setItem("email",String(e));
          })
          .catch((err: any) => {
            alert("Your Not Authorized user");
          });
          setTimeout(()=>{
             route.push("/dashboard");
          },3000)
       
      } catch (error) {
        alert(error);
      }
    };
  return (
    <><ToastContainer /><div className="flex justify-center  bg-red-500 m-10 rounded-lg h-[200px]">
      <div>
        <h3 className="text-center mt-10 font-extrabold text-2xl">Login With Google</h3>
        <GoogleButton
          className='mt-10'
          onClick={(e) => {
            Login();
          } } />
      </div>
    </div></>
  );
}

export default page