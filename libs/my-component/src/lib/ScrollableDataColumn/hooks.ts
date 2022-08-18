import { useEffect } from 'react';

const ItemHeightInRem = 1.6;

export function useSetDataColumnHeight(
  rootRef: React.MutableRefObject<HTMLElement | null>,
  numberOfShowedItem: number
) {
  const correctNumber = correctNumberShowItem(numberOfShowedItem);
  useEffect(() => {
    const el = rootRef.current;
    if (el === null) return;

    const fixedHeight = ItemHeightInRem * correctNumber;
    el.style.height = `${fixedHeight}rem`; 
  }, [correctNumber]);
}

// guarantee the numberOfShowedItem is greater than 2 and always be odd number;
function correctNumberShowItem(numberOfShowedItem: number) {
  if (numberOfShowedItem < 3) return 3;
  if (numberOfShowedItem % 2 === 0) return numberOfShowedItem + 1;
  else return numberOfShowedItem;
}
