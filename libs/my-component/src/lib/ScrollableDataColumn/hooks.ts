import { useEffect, useState } from 'react';

const ItemHeightInRem = 1.6;

export function useRowHeight(
  rowRef: React.MutableRefObject<HTMLElement | null>,
  numberOfShowedItem: number
) {
  useEffect(()=>{
    const rowEl = rowRef.current;
    if (rowEl === null) return;
    const height = 100/numberOfShowedItem;
    rowEl.style.height = `${height}%`;
  },[numberOfShowedItem])
}

// guarantee the numberOfShowedItem is greater than 2 and always be odd number;
export function correctNumberShowItem(numberOfShowedItem: number) {
  if (numberOfShowedItem < 3) return 3;
  if (numberOfShowedItem % 2 === 0) return numberOfShowedItem + 1;
  else return numberOfShowedItem;
}



// export function useRowHeightCalculator(
//   containerRef: React.MutableRefObject<HTMLElement | null>,
//   numberOfShowedItem: number
// ) {
//   const [rowHeight, setRowHeight] = useState(16); // in pixel unit
//   useEffect(() => {
//     const containerEl = containerRef.current;
//     if (containerEl === null) return;
//     const resizeObserver = new ResizeObserver((entries, observer) => {
//       for (let entry of entries) {
//         const containerHeight = entry.borderBoxSize[0].blockSize;
//         console.log(containerHeight);
//         const calculatedHeight =  containerHeight / numberOfShowedItem;
//         setRowHeight(calculatedHeight);
//       }
//     });

//     resizeObserver.observe(containerEl);
//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, [numberOfShowedItem]);
//   return rowHeight;
// }

const MIN_CONTAINER_HEIGHT = 120; // in pixel

