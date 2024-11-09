"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import {AnimatePresence, motion} from 'framer-motion'
import 'swiper/css'
import localFont from 'next/font/local'
import FormOne from './components/Form1'
import FormTwo from './components/Form2'
import FormThree from './components/Form3'
import { active, infomation, isThereErrorSomewhere } from '../store'
import Geturl from './components/Geturl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Form4 from './components/Form4'
const font = localFont({ src: '../fonts/googl-sans-reg.woff2' })
function Page() {
  const { error } = isThereErrorSomewhere()
  const { OverallInfo } = infomation()
  const { activeIndex, setActiveIndex } = active();

  const checkActive = (activeInd: number) => {
    if (activeInd === 0) {
      return !OverallInfo.Name || !OverallInfo.Email || !OverallInfo.DevelopmentTrack||!OverallInfo.ImageUrl
    } else if (activeInd === 1) {
      return !OverallInfo.ProfessionalIntro || !OverallInfo.ProfessionalTagline
    } else if (activeInd === 2) {
      return OverallInfo.Skills.length ==0
    }else if(activeInd ===3 ){
      return OverallInfo.Projects.length==0
    }
  }
  const checkCurrentIndexIfInputIsComplete = (): boolean => {
    if (activeIndex == activeIndex && checkActive(activeIndex)) {
      return true
    } else {
      return false
    }

  }
  const [formVisibility,setFormVisibilty] = useState<boolean>(true)

  const handleDone = ()=>{
  if(OverallInfo.Projects.length ==0){
    alert('YOU SHOULD HAVE AT LEAST ONE PROJECT')
  }else if(OverallInfo.Skills.length==0){
    alert('YOU SHOULD HAVE AT LEAST ONE SKILL')
  }
  else{
    setFormVisibilty(false);
    localStorage.removeItem('Store')
  }

  }
  const query = new QueryClient()

  return (
    <QueryClientProvider client={query}>
    <div className={`${font.className} sm:p-[1em]  w-full bg-[#f0f4f9]  flex justify-center items-center h-full`}>
         <AnimatePresence>
      {formVisibility&&
      <motion.div initial={{y:0,opacity:1}} transition={{duration:0.2}} exit={{y:-100,opacity:0}} className='sm:w-[90%] w-full rounded-none pb-[1em] relative sm:rounded-[1.75em] h-max min-h-[90%] bg-white '>
        <div className='px-[2em] h-max mx-auto max-w-[34.75em] pt-[2em]'>
          <p className='text-[2em] font-[400] text-[#1F1F1F]'>Getting Started</p>
          <p className='text-[1em] font-[400] mt-[1em] text-[#1F1F1F]'>Just Some Info and You&apos;re ready to Go!🚀</p>
        </div>
        <Swiper
          className='w-full h-max flex justify-center items-center'
          modules={[Navigation, Scrollbar]}
          scrollbar={{
            el: '.scrollBaba',
            dragClass: '.dragman'
          }}
          autoHeight={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          navigation={{

            prevEl: '.custom-swiper-button-prev',

            nextEl: '.custom-swiper-button-next',

          }}>
          <div className='scrollBaba mt-[.7em] w-full absolute top-0 h-[.2em]'>
            <div className='.dragman h-full w-[30%] bg-[#0b57d0]'></div>
          </div>
          <SwiperSlide>
            <FormOne />
          </SwiperSlide>
          <SwiperSlide>
            <FormTwo />
          </SwiperSlide>
          <SwiperSlide>
            <FormThree />
          </SwiperSlide>
          <SwiperSlide>
            <Form4/>
          </SwiperSlide>

        </Swiper>
        <div className='flex w-full justify-center gap-[1em] items-center'>
          {<button className={`custom-swiper-button-prev  w-[4.92083125em] text-white h-[2.5em] text-[0.875rem] font-[500] disabled:hidden rounded-[1.25em] bg-[#0b57d0]`}>Prev</button>}
          {activeIndex!==3&&<button className={`custom-swiper-button-next ${checkCurrentIndexIfInputIsComplete() && 'pointer-events-none opacity-40'}  w-[4.92083125em] ${error && 'pointer-events-none opacity-40'} text-white h-[2.5em] text-[0.875rem] font-[500] disabled:hidden rounded-[1.25em] bg-[#0b57d0]`}>Next</button>}
          {activeIndex==3&&<button onClick={handleDone} className='custom-swiper-button-next  w-[4.92083125em] text-white h-[2.5em] text-[0.875rem] font-[500] disabled:hidden rounded-[1.25em] bg-[#0b57d0]'>Done</button>}

        </div>

      </motion.div>}
      </AnimatePresence>
         {!formVisibility&&<Geturl/>}
    </div>
    </QueryClientProvider>
  )
}

export default Page
