import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useDataColumnsContext } from './DataColumnContext';
import { useSharedData } from './SharedDataContext';
import { useRowHeight } from './hooks';



type DataColumnRowProps = {
  data: number | string;
  disabled: boolean;
  rootRef: React.MutableRefObject<null | HTMLElement>;
  index: number;
  height:number;
  
};
export function DataColumnRow(props: DataColumnRowProps) {
  const { data, disabled, rootRef, index,height } = props;
  const { state, action } = useDataColumnsContext();
  const id = index.toString();

  const className = classNames('ScrollableDataColumn__Row', {
    selected: state.selectedItem.id === id,
    disabled: disabled,
  });

  const rowRef = useRef<HTMLDivElement>(null);
  const sharedData = useSharedData();
  useRowHeight(rowRef,height)

  useEffect(()=>{
    if (state.selectedItem.id !== id) return; 
    const rootEl = rootRef.current as HTMLElement;
    const rowEl = rowRef.current as HTMLElement; 
    scrollToRow(rootEl, rowEl);

  },[state.selectedItem])


  const handleSelectItemClick = (e: React.MouseEvent) => {
    if (disabled) return;
    action.selectItem(id);
    sharedData.onSelect(data);
  };
  return (
    <div className={className} onClick={handleSelectItemClick} ref={rowRef}>
      {data}
    </div>
  );
}

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
