import React from 'react'
import Left from './components/Left'
import Rightside from './components/Rightside'
import { Metadata } from 'next'
export const metadata:Metadata={
  title:"Portfolio Generator",
  icons:"/rocket.gif"
}
function page() {
  return (
    <div className='pt-[5em] md:flex md:gap-[2em] md:px-[2em] items-center pb-[2em] px-[1em]'>
      <Left/>
      <Rightside/>
    </div>
  )
}

export default page
