import React, { useEffect, useRef } from 'react';
import {
  DataColumnContextProvider,
  useDataColumnsContext,
} from './DataColumnContext';
import classNames from 'classnames';
import { useGenerateUUID } from '../SideBar/hooks';
import { useSetDataColumnHeight } from './hooks';
import { DataColumnState } from './reducer';
import './ScrollableDataColumn.scss';
import {
  SharedDataContextProvider,
  SharedDataType,
  useSharedData,
} from './SharedDataContext';

type ColumnDataType = {
  value: number | string;
  disabled?: boolean;
};

export type ScrollableDataColumnProps = {
  dataSet: ColumnDataType[];
  /** must be odd number so that the selected one will be in the middle */
  numberShowedItem?: number;
  className?: string;
  initialSelected?: number | string;
  onSelect?: (value: number | string) => void;
};

const defaultProps: Required<ScrollableDataColumnProps> = {
  dataSet: [],
  className: '',
  numberShowedItem: 3,
  initialSelected: 0,
  onSelect: (value) => {},
};

export function ScrollableDataColumn(props: ScrollableDataColumnProps) {
  const initialState: DataColumnState = {
    selectedItem: { id: '' },
  };

  const onSelect =
    props.onSelect === undefined ? defaultProps.onSelect : props.onSelect;

  const sharedData: SharedDataType = {
    onSelect: onSelect,
  };

  return (
    <SharedDataContextProvider sharedData={sharedData}>
      <DataColumnContextProvider initialState={initialState}>
        <WrappedDataColumn {...props} />
      </DataColumnContextProvider>
    </SharedDataContextProvider>
  );
}

export function WrappedDataColumn(props: ScrollableDataColumnProps) {
  const newProps = { ...defaultProps, ...props };
  const { dataSet, numberShowedItem, initialSelected, onSelect, className } =
    newProps;
  const rootRef = useRef(null);
  useSetDataColumnHeight(rootRef, numberShowedItem);

  const renderRows = () => {
    const rows = dataSet.map((e, i) => {
      let { value, disabled } = e;
      disabled = disabled === undefined ? false : disabled;
      return (
        <DataColumnRow
          key={i}
          disabled={disabled}
          data={value}
          rootRef={rootRef}
        />
      );
    });

    const numberOfDummyRow = numberShowedItem - 1;
    for (let i = 0; i < numberOfDummyRow; i++) {
      const dummyRow = <div className="ScrollableDataColumn__DummyRow">1</div>;
      rows.push(dummyRow);
    }

    return rows;
  };

  const rootClassName = classNames('ScrollableDataColumn', {
    [`${className}`]: className,
  });

  return (
    <div className={rootClassName} ref={rootRef}>
      <div className="ScrollableDataColumn__Container">{renderRows()}</div>
    </div>
  );
}

type DataColumnRowProps = {
  data: number | string;
  disabled: boolean;
  rootRef: React.MutableRefObject<null | HTMLElement>;
};

function DataColumnRow(props: DataColumnRowProps) {
  const { data, disabled, rootRef } = props;
  const { state, action } = useDataColumnsContext();
  const id = useGenerateUUID();

  const className = classNames('ScrollableDataColumn__Row', {
    selected: state.selectedItem.id === id,
    disabled: disabled,
  });
  const sharedData = useSharedData();

  const handleSelectItemClick = (e: React.MouseEvent) => {
    if (disabled) return;

    const rowEl = e.target as HTMLElement;
    const pos = {
      top: rowEl.offsetTop,
      left: rowEl.offsetLeft,
    };

    const rootEl = rootRef.current;
    if (rootEl === null) return;
    rootEl.scrollTo({
      top: pos.top,
      left: pos.left,
      behavior: 'smooth',
    });
    action.selectItem(id);
    sharedData.onSelect(data);
  };
  return (
    <div className={className} onClick={handleSelectItemClick}>
      {data}
    </div>
  );
}

export default ScrollableDataColumn;
