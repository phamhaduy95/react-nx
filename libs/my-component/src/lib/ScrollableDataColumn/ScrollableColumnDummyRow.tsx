import React, { useEffect, useRef } from 'react';
import { useRowHeight } from './hooks';
type DummyRowProps = {
  numberOfShowedItem: number;
};
export  function DummyRow(props: DummyRowProps) {
   const {numberOfShowedItem} = props;
   const rowRef = useRef<HTMLDivElement|null>(null);
   
   useEffect(()=>{
    const el = rowRef.current;
    if (el === null) return;
    const rowHeight = (numberOfShowedItem-1)*100/numberOfShowedItem;
    el.style.height = `${rowHeight}%`;
   },[numberOfShowedItem])


    return (
    <div className="ScrollableDataColumn__DummyRow" ref={rowRef}>
      1
    </div>
  );
}
