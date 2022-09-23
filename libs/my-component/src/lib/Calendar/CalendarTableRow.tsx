import { useCalendarSharedData } from './CalendarSharedDataContext';
import { CalendarTableData } from './useGenerateCalendarData';

export type CalendarTableRowProps = {
  rowData: CalendarTableData[number];
};

export function CalendarTableRow(props: CalendarTableRowProps) {
  const { rowData } = props;
  const sharedData = useCalendarSharedData();
  const { disabledDate, CellComponent } = sharedData;
  const renderRowData = () => {
    return rowData.map((data, index) => {
      const { date } = data;
      const isDisabled = disabledDate(date);
      return CellComponent({ data: data, isDisabled: isDisabled, key: index });
    });
  };

  return <tr className="Calendar__Table__Row">{renderRowData()}</tr>;
}
