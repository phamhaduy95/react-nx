import './Pagination.scss';
import createViewForPagination from './createViewForPagination';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  useEffect,
  useEffect as useEffectSkipFirstRender,
  useMemo,
} from 'react';
import { IconButton } from '../Button/IconButton';
import { PaginationStoreProvider, usePaginationStore } from './PaginationStore';

export type PaginationProps = {
  maxNumber: number;
  className?: string;
  /** number of showed indices on the left or on the right of the active index */
  siblingCount?: number;
  /** number of indices next to the two endpoints */
  boundaryCount?: number;
  onActiveChange?: (activeIndex: number) => void;
  disabled?: boolean;
  activeIndex?: number;
};

const defaultProps: Omit<
  Required<PaginationProps>,
  'children' | 'className'
> = Object.freeze({
  boundaryCount: 1,
  siblingCount: 0,
  maxNumber: 6,
  onActiveChange() {},
  disabled: false,
  activeIndex: 1,
});

export function Pagination(props: PaginationProps) {
  return (
    <PaginationStoreProvider>
      <WrappedPagination {...props} />
    </PaginationStoreProvider>
  );
}

function WrappedPagination(props: PaginationProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    maxNumber,
    boundaryCount,
    siblingCount,
    disabled,
    onActiveChange,
    activeIndex: item,
  } = newProps;
  const action = usePaginationStore((state) => state.action);
  const activeIndex = usePaginationStore((state) => state.currentIndex);

  useEffect(() => {
    action.updateMaxIndex(maxNumber);
  }, [maxNumber]);

  useEffect(() => {
    action.moveToNew(item);
  }, [item]);

  const ItemList = useMemo(
    () =>
      createViewForPagination(
        maxNumber,
        siblingCount,
        boundaryCount,
        activeIndex
      ),
    [maxNumber, siblingCount, boundaryCount, activeIndex]
  );

  useEffectSkipFirstRender(() => {
    onActiveChange(activeIndex);
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
    <div className={`Pagination`}>
      <IconButton
        className="Pagination__Icon Previous"
        disabled={disabled}
        onClick={handlePrevClick}
        variant="secondary"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      {ItemList}
      <IconButton
        className="Pagination__Icon Next"
        disabled={disabled}
        onClick={handleNextClick}
        variant="secondary"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
