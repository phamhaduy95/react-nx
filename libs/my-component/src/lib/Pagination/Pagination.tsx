import "./Pagination.scss";
import PaginationContextProvider from "./PaginationContextProvider";
import createViewForPagination from "./createViewForPagination";
import { ReactComponent as PrevArrowIcon } from "./arrow-left.svg";
import { ReactComponent as NextArrowIcon } from "./arrow-right.svg";
import { usePaginationContext } from "./PaginationContextProvider";
import { PaginationState } from "./PaginationReducer";
import { useEffect } from "react";

type PaginationProps = {
  maxNumber: number;
  className?: string;
  /** number of showed indices on the left or on the right of the active index */
  siblingCount?: number;
  /** number of indices next to the two endpoints */
  boundaryCount?: number;
  onActiveChange?: (activeIndex: number) => void;
  disabled?: boolean;
};

function WrappedPagination(props: PaginationProps) {
  let { maxNumber, className, siblingCount, boundaryCount, onActiveChange } =
    props;
  className = className === undefined ? "Pagination-default" : className;
  siblingCount = siblingCount === undefined ? 1 : siblingCount;
  boundaryCount =
    boundaryCount === undefined || boundaryCount === 0 ? 1 : boundaryCount;

  const { state, action } = usePaginationContext();
  const { disabled } = state;
  const activeIndex = state.selectedItem;

  const ItemList = createViewForPagination(
    maxNumber,
    siblingCount,
    boundaryCount,
    activeIndex
  );

  useEffect(() => {
    if (onActiveChange) onActiveChange(activeIndex);
  }, [activeIndex]);

  const handlePrevClick = (event: React.MouseEvent) => {
    event.preventDefault();
    action.movePrev();
  };

  const handleNextClick = (event: React.MouseEvent) => {
    event.preventDefault();
    action.moveNext();
  };

  return (
    <div className={`Pagination ${className}`}>
      <button
        className="Pagination_Icon Previous"
        disabled={disabled}
        onClick={handlePrevClick}
      >
        <PrevArrowIcon />
      </button>
      {ItemList}
      <button
        className="Pagination_Icon Next"
        disabled={disabled}
        onClick={handleNextClick}
      >
        <NextArrowIcon />
      </button>
    </div>
  );
}

function Pagination(props: PaginationProps) {
  let { maxNumber, disabled } = props;
  disabled = disabled === undefined ? false : disabled;
  const initialState: PaginationState = {
    selectedItem: 1,
    maxIndex: maxNumber,
    disabled: disabled,
  };
  return (
    <PaginationContextProvider initialState={initialState}>
      <WrappedPagination {...props} />
    </PaginationContextProvider>
  );
}

export default Pagination;
