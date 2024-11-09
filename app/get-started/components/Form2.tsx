"use client"
import React, {  useState } from "react";
import localFont from "next/font/local";
import { infomation, isThereErrorSomewhere } from "@/app/store";
const sansRegular = localFont({src:'../../fonts/googl-sans-reg.woff2'})
export default function FormTwo (){
  const [Error,setErrorFirstElement] = useState('');
  const [ErrorSecEl,setErrorSecEl] = useState('');
  const {setInfo,OverallInfo} = infomation();
  const {isThereError} = isThereErrorSomewhere();

  const checkForError = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const wordsCount = e.target.value.trim().split(/\s+/);
    if(wordsCount.length<8){
          isThereError(true)
           setErrorFirstElement('minimum of 8 words expected!')
    }else if(wordsCount.length>=10){
     setErrorFirstElement('')
     isThereError(false)
    }

  }
  const handleOverallUpdater = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setInfo(e.target.name,e.target.value);

  }

 const checkForError2 = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
   const wordsCount = e.target.value.trim().split(/\s+/);
   if(wordsCount.length<12){
         isThereError(true)
          setErrorSecEl('minimum of 12 words expected!')
   }else if(wordsCount.length>=20){
    setErrorSecEl('')
        isThereError(false)
   }

 }


  return (<div className={`${sansRegular.className} h-max mx-auto max-w-[34.75em] p-[2em]`}>
    <label className='text-[.9em]' htmlFor="name">Your Professional Tagline:</label>
     <p className="text-[.8em] mt-[.3em] text-[#585757]">*This Would be a short Description of what you do. Eg: building scalable website for brands* </p>
     <p className="text-[.8em] mt-[.5em] text-red-600">{Error} </p>
    <textarea  onBlur={checkForError} value={OverallInfo.ProfessionalTagline} onChange={(e)=>{handleOverallUpdater(e);checkForError(e)}} name="ProfessionalTagline"  className='border mb-[1em] mt-[.2em] h-[4em] placeholder:text-[#444746] px-[0.9375em] outline-none placeholder:font-[400] w-full  text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name'  />

    <label className='text-[.9em] ' htmlFor="Email">Professional Introduction:</label>
    <p className="text-[.8em] mt-[.5em] text-[#585757]">*Briefly describe how you help clients achieve their goals* </p>
    <p className="text-[.8em] mt-[.5em] text-red-600">{ErrorSecEl}</p>

    <textarea onBlur={checkForError2}  value={OverallInfo.ProfessionalIntro} onChange={(e)=>{handleOverallUpdater(e);checkForError2(e)}} name="ProfessionalIntro"  className='border mt-[.2em] h-[5em] placeholder:text-[#444746] px-[0.9375em] outline-none placeholder:font-[400] w-full  text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name'  />

  </div>)
}
