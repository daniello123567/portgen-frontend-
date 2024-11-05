import React from 'react'

function Vercelllogo({classname,height}:{classname?:string,height?:number}) {
  return (
<svg className={classname} aria-label="Vercel logomark" height={!height?"22":height} role="img"  viewBox="0 0 74 64"><path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="var(--geist-foreground)"></path></svg>  )
}

export default Vercelllogo
