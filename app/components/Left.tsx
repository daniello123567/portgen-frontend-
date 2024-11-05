import React from 'react'
import {Inter} from 'next/font/google'
import Nextjslogo from './Nextjslogo'
import Vercelllogo from './Vercelllogo'
import Link from 'next/link'
const inter = Inter({weight:"600",subsets:["latin"]})
const inter2 = Inter({weight:"400",subsets:["latin"]})
const inter3 = Inter({weight:"500",subsets:["latin"]})
function Left() {
  return (
    <div className={`md:text-left md:items-start text-center md:justify-start  w-full flex gap-[1em] flex-col  justify-center items-center h-max`}>
      <div className='w-full items-center md:justify-start  gap-[1em] justify-center flex'>
        <Nextjslogo/>
        <Vercelllogo/>
      </div>
      <p className={`${inter.className} md:text-left text-[#1B1B25] md:leading-[64px] md:tracking-[-2.24px] md:text-[3.5em] text-[2.25em] leading-[44px]`}>Craft Your Personal Website <span className='text-[#9455F1]'>In Seconds!</span></p>
    <p className={`text-[#45454F] md:text-left  leading-[24px] ${inter2.className}`}>Transform your ideas into a stunning portfolio with our platform! Simply input your information, and watch as we generate a sleek Next.js portfolio, seamlessly deployed on Vercel.
    </p>
    <Link href='/get-started' className={`${inter3.className} mt-[1em] bg-[#272731] border shadow-btnshadow border-[#1B1B25] text-nowrap py-[0.5em] rounded-full  text-white  text-[0.875em] px-[0.875em] `}>Get Started</Link>
    </div>
  )
}

export default Left
