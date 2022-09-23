import {
  ScrollableDataColumn,
  ScrollableDataColumnProps,
} from '@phduylib/my-component';
import { memo } from 'react';

type Props = {
  className: string;
  dataSet: ScrollableDataColumnProps['dataSet'];
  numberShowedItem: number;
  onSelect: ScrollableDataColumnProps['onSelect'];
  value: number|undefined;
};

export const TimePanelDataColumn = memo((props: Props)=> {
  const { className, dataSet, numberShowedItem, onSelect, value } = props;
  let newValue = value === undefined?null:value;

  console.log(className," rendered")
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
