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
  initialSelected?: number | string | null;
  onSelect?: (value: number | string) => void;
};

const defaultProps: Required<ScrollableDataColumnProps> = {
  dataSet: [],
  className: '',
  numberShowedItem: 3,
  initialSelected: null,
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
  const { state, action } = useDataColumnsContext();
  useSetDataColumnHeight(rootRef, numberShowedItem);
  useEffect(() => {
    if (initialSelected === null) return;
    
    const pos = dataSet
      .map((e) => e.value)
      .findIndex((e) => e.toString() === initialSelected.toString());
  
    if (pos === -1) return;
    action.selectItem(pos.toString());
  }, [initialSelected]);

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
        />
      );
    });

    const numberOfDummyRow = numberShowedItem - 1;
    for (let i = 0; i < numberOfDummyRow; i++) {
      const dummyRow = <div className="ScrollableDataColumn__DummyRow" key={`dummy-${i}`}>1</div>;
      rows.push(dummyRow);
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
