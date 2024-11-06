"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { infomation } from '@/app/store'
import ParagraphCycler from './Wordswitch'
import Vercelllogo from '@/app/components/Vercelllogo'
import { useQuery } from "@tanstack/react-query"
import Image from 'next/image'
import Done from './Done'
function Geturl() {
  const { OverallInfo } = infomation()
  const data = {
    ImageUrl: OverallInfo.ImageUrl,
    NamesofUser: OverallInfo.Name,
    workofuser: OverallInfo.DevelopmentTrack,
    Heromsg: OverallInfo.ProfessionalTagline,
    Herosummary: OverallInfo.ProfessionalIntro,
    Email: OverallInfo.Email,
    Skills: JSON.stringify([...OverallInfo.Skills]),
    Projects: JSON.stringify([...OverallInfo.Projects])
  }
  const [isBuilding, setisBuilding] = useState<boolean>(true)
  const [url, seturl] = useState<string>()
  const getUrlFunc = async () => {
    try {
      setisBuilding(true)
      const response = await fetch('https://portfoliogen.vercel.app/Template', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify(data)
      });

      const datax = await response.json();
      if (datax.yournewurl) {
        seturl(datax.yournewurl);
        setisBuilding(false);
        window.location.href=datax.yournewurl;
      } else {
        alert('ERROR FROM VERCEL!,Check Internet')
      }
    } catch (error) {
      if (error) alert('SOMETHING WENT WRONG PLEASE RETRY AGAIN!')

    }
  }
  useQuery({ queryKey: ["uploader"], queryFn: () => getUrlFunc() })

  return (
    <motion.div className='md:w-[60%] px-[1em] gap-[.8em] flex-col flex justify-center items-center w-full rounded-[.7em] h-full bg-white shadow-lg md:h-[80%]'
      transition={{ duration: 0.3, delay: 0.5 }}
      animate={{ opacity: 1 }} initial={{ opacity: 0 }}
    >
      <Vercelllogo height={40} classname='w-[3em]' />

      <div className='flex items-center gap-[.5em]'>
        <p className='md:text-[1.4em] text-[1.2em]'>{url ? "Congratulations Your Portfolio is Live at: " : "Deploying To Vercel"}</p>
        <div className='w-[3em] h-[3em]'>
          {isBuilding ?
            !url && <Image width={500} height={500} alt='imgman' src={'/Spinner.svg'} />
            :
            <Done />}
        </div>
      </div>

      <motion.div className='border shadow-lg relative flex justify-center items-center w-full h-[3em]'>
        {url ? `${url}` : <ParagraphCycler />}
      </motion.div>
      <p className='text-[.9em] text-center'>*You will receive a URL for your portfolio upon completion*</p>

    </motion.div>
  )
}

export default Geturl
