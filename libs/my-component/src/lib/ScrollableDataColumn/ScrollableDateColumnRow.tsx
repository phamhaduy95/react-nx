import classNames from 'classnames';
import { memo, useEffect, useRef } from 'react';
import { useSharedData } from './SharedDataContext';
import { useRowHeight } from './hooks';
import { useDataColumnStore } from './DataColumnStoreProvider';



type DataColumnRowProps = {
  data: number | string;
  disabled: boolean;
  rootRef: React.MutableRefObject<null | HTMLElement>;
  index: number;
  height:number;
  
};
export const  DataColumnRow= memo((props: DataColumnRowProps)=>{
  const { data, disabled, rootRef, index,height } = props;
  console.log(height)
  const id = index.toString();
  const action = useDataColumnStore((state)=>(state.action));
  const isSelected = useDataColumnStore((state)=>(state.selectedItem?.id === id));


  const className = classNames('ScrollableDataColumn__Row', {
    selected: isSelected,
    disabled: disabled,
  });

  const rowRef = useRef<HTMLDivElement>(null);
  const sharedData = useSharedData();
  useRowHeight(rowRef,height)

  useEffect(()=>{
    if (!isSelected) return; 
    const rootEl = rootRef.current as HTMLElement;
    const rowEl = rowRef.current as HTMLElement; 
    scrollToRow(rootEl, rowEl);

  },[isSelected])


  const handleSelectItemClick = (e: React.MouseEvent) => {
    if (disabled) return;
    action.selectItem({id:id.toString()});
    sharedData.onSelect(data);
  };
  return (
    <div className={className} onClick={handleSelectItemClick} ref={rowRef}>
      {data}
    </div>
  );
});

function scrollToRow(rootEl: HTMLElement, rowEl: HTMLElement) {
  const pos = {
    top: rowEl.offsetTop,
    left: rowEl.offsetLeft,
  };

  if (rootEl === null) return;
  rootEl.scrollTo({
    top: pos.top,
    left: pos.left,
    behavior: 'smooth',
  });
}

