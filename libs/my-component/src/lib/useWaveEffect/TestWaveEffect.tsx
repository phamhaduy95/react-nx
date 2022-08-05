import React, { CSSProperties, useEffect, useRef } from 'react'
import { useWaveEffect } from './useWaveEffect'
export default function TestWaveEffect(props:any) {
  const style:CSSProperties = {
    backgroundColor:"hsla(220,80%,50%,0.9)",
    padding:"0.5rem 0.5rem",
    display:"inline-block",
    color:"hsl(0,0%,90%)",
  }
  
  const ref = useRef<any>(null);
  useWaveEffect(ref)
  return (
    <div ref={ref} style={style}>Wave</div>
  )
}
