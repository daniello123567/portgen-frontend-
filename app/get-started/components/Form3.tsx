import React, {useState } from "react";
import localFont from "next/font/local";
import { infomation } from "@/app/store";
import ProjectUpdate from "./ProjectUpdate";
const sansRegular = localFont({src:'../../fonts/googl-sans-reg.woff2'})

export default function FormThree (){
  const [skill,setSkill] = useState<string>('');
  const {OverallInfo,setSkills,setInfo} = infomation();
  const removeSkill = (e:React.MouseEvent<HTMLDivElement, MouseEvent>&{target:{innerText:string}})=>{
    const wordTodelete = e.target.innerText;
    const newSkills = OverallInfo.Skills.filter(skill => skill!==wordTodelete);
    setInfo("Skills",[...newSkills])
 }
 const Skill = ({skill}:{skill:string})=>{
   return (<div onClick={removeSkill} className="text-[.9em] relative bg-slate-100 px-[.3em] w-max h-max  cursor-pointer font-[500]">{skill}
  </div>)
 }
  return (<div onTouchStart={(e)=>e.stopPropagation()}
  className={`${sansRegular.className}  h-max mx-auto max-w-[34.75em] px-[1em] py-[2em]`}>
    <div onTouchStart={(e)=>e.stopPropagation()}
 className="skills gap-x-[.6em] w-full max-h-[5.10833125em] mb-[.7em] flex-wrap overflow-y-auto flex">
         {OverallInfo.Skills.length!==0&&OverallInfo.Skills.map((skill:string)=>{
          return <Skill key={skill} skill={skill} />
         })}
    </div>
    <label className='text-[.9em] font-[900]' htmlFor="name">Skill:</label>
    <div className="w-full relative h-max">
      <input value={skill} onChange={(e)=>{e.stopPropagation();setSkill(e.target.value)}} id='name' placeholder='e.g react' className='border skillInput mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="text" />
     <div onClick={()=>{
      setSkills(skill);
      setSkill('')
     }} className="w-max p-[.5em] top-3 right-3 cursor-pointer bg-[#0b57d0] text-white flex justify-center items-center absolute h-[2.5em] rounded-full ">&#43; Add Skill</div>
    </div>

    <ProjectUpdate/>
  </div>)
}
