import {
  ScrollableDataColumn,
  ScrollableDataColumnProps,
} from '@phduylib/my-component';

type Props = {
  className: string;
  dataSet: ScrollableDataColumnProps['dataSet'];
  numberShowedItem: number;
  onSelect: ScrollableDataColumnProps['onSelect'];
  value: number;
};

export default function TimePanelDataColumn(props: Props) {
  const { className, dataSet, numberShowedItem, onSelect, value } = props;
  return (
    <ScrollableDataColumn
      className={className}
      dataSet={dataSet}
      numberShowedItem={numberShowedItem}
      onSelect={onSelect}
      initialSelected={value}
    />
  );
}
