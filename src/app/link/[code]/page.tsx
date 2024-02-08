'use client'
import React, { useEffect, useState } from 'react'
import { useParams,useRouter } from 'next/navigation'
import axios from 'axios'
function page() {
    const route=useRouter()
    const {code}=useParams()
   
    useEffect(()=>{
        axios.post("../../api/url",{short:code})
        .then((res)=>{
            const url=res.data
            url.map((e:any)=>{
                return route.push(e.long)
            })
        })
        .catch((err)=>{
            alert("Wrong URL")
        })
    },[]) 
    
  return (
    <div><h1>Loading...</h1></div>
  )
}

export default page