import React, { useRef } from 'react';
import { useRowHeight } from './hooks';
type DummyRowProps = {
  height: number;
};
export  function DummyRow(props: DummyRowProps) {
   const {height} = props;
   const rowRef = useRef<HTMLDivElement|null>(null);
   useRowHeight(rowRef,height)
    return (
    <div className="ScrollableDataColumn__DummyRow" ref={rowRef}>
      1
    </div>
  );
}
