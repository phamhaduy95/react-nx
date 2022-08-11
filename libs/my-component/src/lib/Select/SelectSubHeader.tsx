import React from 'react'

type SelectSubHeaderProps = {
    children:JSX.Element|string;
}

export function SelectSubHeader(props:SelectSubHeaderProps) {
  return (
    <div className='Select__SubHeader'>
        {props.children}
    </div>
  )
}
