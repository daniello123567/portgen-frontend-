import React from 'react'
import './globals.css'
function RootLayout({children}:{children:React.ReactNode}) {
  return (
<html>
<body className='w-full h-screen'>
  <div className='w-full h-full'>{children}</div>
</body>
</html>  )
}

export default RootLayout
