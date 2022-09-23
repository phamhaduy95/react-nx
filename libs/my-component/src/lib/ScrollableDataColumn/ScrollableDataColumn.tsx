import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useRowHeightCalculator } from './hooks';
import './ScrollableDataColumn.scss';
import { SharedDataContextProvider, SharedDataType } from './SharedDataContext';
import { DummyRow } from './ScrollableColumnDummyRow';
import DataColumnStoreProvider from './DataColumnStoreProvider';
import { useDataColumnStore } from './DataColumnStoreProvider';
import { DataColumnRow } from './ScrollableDateColumnRow';

type ColumnDataType = {
  value: number | string;
  disabled?: boolean;
};

export type ScrollableDataColumnProps = {
  dataSet: ColumnDataType[];
  /** must be odd number so that the selected one will be in the middle */
  numberShowedItem?: number;
  className?: string;
  value?: number | string | null;
  onSelect?: (value: number | string) => void;
};

const defaultProps: Required<ScrollableDataColumnProps> = {
  dataSet: [],
  className: '',
  numberShowedItem: 3,
  value: null,
  onSelect: (value) => {},
};

export function ScrollableDataColumn(props: ScrollableDataColumnProps) {
  const newProps = { ...defaultProps, ...props };
  const { onSelect } = newProps;
  const sharedData: SharedDataType = {
    onSelect: onSelect,
  };

  return (
    <SharedDataContextProvider sharedData={sharedData}>
      <DataColumnStoreProvider>
        <WrappedDataColumn {...props} />
      </DataColumnStoreProvider>
    </SharedDataContextProvider>
  );
}

export function WrappedDataColumn(props: ScrollableDataColumnProps) {
  const newProps = { ...defaultProps, ...props };
  const { dataSet, numberShowedItem, value, className } =
    newProps;
  const rootRef = useRef(null);
  const action = useDataColumnStore((state) => state.action);

  const rowHeight = useRowHeightCalculator(rootRef, numberShowedItem);
  // update state when the input prop value is changed
  useEffect(() => {
    if (value === null) {
      action.selectItem(null);
      return;
    }
    const pos = dataSet
      .map((e) => e.value)
      .findIndex((e) => e.toString() === value.toString());
    if (pos === -1) return;
    const itemId = pos.toString();
    action.selectItem({ id: itemId });
  }, [value]);

  const renderRows = () => {
    const rows = dataSet.map((e, i) => {
      let { value, disabled } = e;
      disabled = disabled === undefined ? false : disabled;
      return (
        <DataColumnRow
          key={`regularRow-${i}`}
          disabled={disabled}
          data={value}
          rootRef={rootRef}
          index={i}
          height={rowHeight}
        />
      );
    });

    const numberOfDummyRow = numberShowedItem - 1;
    for (let i = 0; i < numberOfDummyRow; i++) {
      rows.push(<DummyRow height={rowHeight} key={`dummy-${i}`} />);
    }

    return rows;
  };

  const rootClassName = classNames('ScrollableDataColumn', {
    [`${className}`]: className,
    show: true,
  });

  return (
    <div className={rootClassName} ref={rootRef}>
      {renderRows()}
    </div>
  );
}

export default ScrollableDataColumn;
