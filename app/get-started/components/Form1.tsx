"use client"
import React, { useState } from "react";
import localFont from "next/font/local";
import supabase from "@/app/utils/supabase";
import {infomation} from '../../store'
import Loader2 from "./Loader2";
const sansRegular = localFont({src:'../../fonts/googl-sans-reg.woff2'})
export default function FormOne (){
  const {setInfo,OverallInfo} = infomation();

  const [isLoading,setisLoading] = useState<boolean>(false);
  const handleOverallUpdater = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInfo(e.target.name,e.target.value)
  }
  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from('coverimages').getPublicUrl(filePath);
    return data;
  }
  const UploadFile = async (file:File)=>{
    const filename = `${Date.now()}-${file.name}`
      const {data,error} =  await supabase.storage.from('coverimages').upload(filename,file)
      if(data){
        return data.path
      }else if(error){
        alert(error)
      }
    }
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file:File|undefined = e.target?.files?.[0];
    if(file){
      setisLoading(true)
    const path = await UploadFile(file)
    if(path){
    const {publicUrl} = getPublicUrl(path);
        setInfo("ImageUrl",publicUrl)
        setisLoading(false)
    }
    }
  }
  console.log(OverallInfo,"hello");

  return (<div className={`${sansRegular.className} h-max mx-auto max-w-[34.75em] p-[2em]`}>
    <label className='text-[.9em]' htmlFor="name">Display Name:</label>
    <input defaultValue={OverallInfo.Name} onChange={handleOverallUpdater} name="Name" id='name' placeholder='Name e.g John Doe' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="text" />
    <label className='text-[.9em]' htmlFor="Email">Email:</label>
    <input defaultValue={OverallInfo.Email} onChange={handleOverallUpdater} name="Email" id='Email' placeholder='Enter Email' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="email" />
    <label className='text-[.9em]' htmlFor="Email">Development Track:</label>
    <input defaultValue={OverallInfo.DevelopmentTrack} onChange={handleOverallUpdater} name="DevelopmentTrack" id='Email' placeholder='Frontend Developer/Fullstack Developer..etc' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="email" />
    <label className='text-[.9em]' htmlFor="Email">Your Profile Image:</label>
    <div className="h-[.7em] w-[3em]">
      {isLoading&&<Loader2/>}
    </div>
    <input accept="image/*" onChange={handleImage} name="ImageUrl" placeholder='Frontend Developer/Fullstack Developer..etc' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="file" />
  </div>)
}
