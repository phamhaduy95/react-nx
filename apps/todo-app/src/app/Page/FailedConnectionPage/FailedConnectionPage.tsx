import React from 'react'
import NoWifiImg from "apps/todo-app/src/assets/no-wifi.png"
import "./FailedConnectionPage.scss"
export default function FailedConnectionPage() {
  return (
    <div className='FailedConnectionPage'>
        <div className='PageContent'>
            <img src={NoWifiImg}/>
            <p className='PageContent__Message'>Cannot connect to server!</p>
        </div>
    </div>
  )
}
