import classNames from 'classnames';
import { usePaginationStore } from './PaginationStore';

type PaginationItemProps = {
  index: number;
};

export default function PaginationItem(props: PaginationItemProps) {
  let { index } = props;
  const action = usePaginationStore((state) => state.action);
  const isActive = usePaginationStore((state) => state.currentIndex === index);
  const rootClassName = classNames('Pagination__Item', {
    ['is-active']: isActive,
  });

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    action.moveToNew(index);
  }

  return (
    <button  className={rootClassName} onClick={handleClick} >
      {index}
    </button>
  );
}
