"use client"
import React, {  useState } from 'react'
import { motion } from 'framer-motion'
import { infomation } from '@/app/store'
import ParagraphCycler from './Wordswitch'
import Vercelllogo from '@/app/components/Vercelllogo'
import Image from 'next/image'
import Done from './Done'
import { useQuery } from '@tanstack/react-query'
import DeployToVercel from '@/app/utils/Deploy'
import CountdownTimer from './Timer'
function Geturl() {
  const { OverallInfo } = infomation()
  const data:UsersInfo = {
    UsersImage: OverallInfo.ImageUrl,
    NamesOfUser: OverallInfo.Name,
    RoleOfUser: OverallInfo.DevelopmentTrack,
    Heromsg: OverallInfo.ProfessionalTagline,
    Herosummary: OverallInfo.ProfessionalIntro,
    Email: OverallInfo.Email,
    Skills: JSON.stringify([...OverallInfo.Skills]),
    projects: JSON.stringify([...OverallInfo.Projects])
  }
  const [isBuilding, setisBuilding] = useState<boolean>(true)
  const [url, seturl] = useState<string>()
const getUrl = async ()=>{
  const urlalias = DeployToVercel(data.UsersImage,
    data.NamesOfUser,data.RoleOfUser,data.Heromsg,data.Herosummary
    ,data.Email,data.Skills,data.projects);
  if(await urlalias){
    seturl(String(await urlalias));
    setisBuilding(false);
    window.location.href=`${await urlalias}`;
    return 'sth for usequery'
  }

}


useQuery({queryKey:['uploading'],queryFn:()=>getUrl()});
const Text = ()=>{
  return <div className='flex items-center'>
    <span>Deploying To Vercel</span>
    <div className='w-[3em] h-[3em]'>
          {isBuilding ?
            !url && <Image width={500} height={500} alt='imgman' src={'/Spinner.svg'} />
            :
            <Done />}
        </div>
  </div>
}
  return (
    <motion.div className='md:w-[60%] px-[1em] gap-[.8em] flex-col flex justify-center items-center w-full rounded-[.7em] h-full bg-white shadow-lg md:h-[80%]'
      transition={{ duration: 0.3, delay: 0.5 }}
      animate={{ opacity: 1 }} initial={{ opacity: 0 }}
    >
      <Vercelllogo height={40} classname='w-[3em]' />
      <div className='flex flex-col w-full items-center gap-[.5em]'>
        <p className='md:text-[1.4em] text-[1.2em]'>{url ? "Congratulations Your Portfolio is Live at: " : <Text/>}</p>
        <p className='text-[.9em] text-[#696868]'>Build Time <CountdownTimer/> </p>


      </div>

      <motion.div className='border shadow-lg relative flex justify-center items-center w-full h-[3em]'>
        {url ? `${url}` : <ParagraphCycler />}
      </motion.div>

      <p className='text-[.9em] text-center'>*You will receive a URL for your portfolio upon completion*</p>

    </motion.div>
  )
}

export default Geturl
