import React from 'react'
import "./globalStyle.scss"
type Props = {
    children:React.ReactNode;
}

export default function GlobalStyleProvider(props:Props) {

  return (
    <>
        {props.children}
    </>
  )
}
