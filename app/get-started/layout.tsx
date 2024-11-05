import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Metadata } from 'next'
export const metadata:Metadata={
  title:"Portfolio Generator",
  icons:"/rocket.gif"
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <AnimatePresence>
    <div className='w-full h-full'>{children}</div>
    </AnimatePresence>
  )
}

export default RootLayout
