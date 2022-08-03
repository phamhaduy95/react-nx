import { useContext } from "react";
import { PaginationContext, usePaginationContext } from './PaginationContextProvider';

type PaginationItemProps = {
  index: number;
};

export default function PaginationItem(props: PaginationItemProps) {
  let { index } = props;

  const { state, action } = usePaginationContext();
  const { selectedItem,disabled } = state;
  function toggleActive() {
    if (selectedItem === index) return "Active";
    return "";
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    action.selectNew(index);
  }

  return (
    <button className={`Pagination_Item ${toggleActive()}`} disabled={disabled} onClick={handleClick}>
      {index}
    </button>
  );
}
