import { memo } from 'react';
import {
  ScrollableDataColumn,
  ScrollableDataColumnProps,
} from '../ScrollableDataColumn';

type Props = {
  className: string;
  dataSet: ScrollableDataColumnProps['dataSet'];
  numberShowedItem: number;
  onSelect: ScrollableDataColumnProps['onSelect'];
  value: number | undefined;
};

export const TimePanelDataColumn = memo((props: Props) => {
  const { className, dataSet, numberShowedItem, onSelect, value } = props;
  let newValue = value === undefined ? null : value;

  return (
    <ScrollableDataColumn
      className={className}
      dataSet={dataSet}
      numberShowedItem={numberShowedItem}
      onSelect={onSelect}
      value={newValue}
    />
  );
});
