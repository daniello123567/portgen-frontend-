import Image from 'next/image'
import React from 'react'

function Rightside() {
  return (
    <div className='relative mx-auto md:mx-0 md:mt-0 mt-[2em] shadow-btnshadow2 rounded-[0.4375em] w-[90%] h-[36em]'>
      <Image className='w-full h-full object-cover' width={500} height={500} alt='image' src="/portfolio.png"/>
    </div>
  )
}

export default Rightside
