import { useRef } from 'react';
import classNames from 'classnames';
import { useMonthScheduleStore } from './MonthScheduleStoreProvider';
import { MonthScheduleTask } from './MonthScheduleTask';
import { MonthScheduleTasksExpandButton } from './MonthScheduleTasksExpandButton';
import { findsAllShowedTasksInTaskLine } from '../utils';
import { useMonthScheduleSharedData } from './MonthScheduleContextProvider';

const LINE_LIMIT = 2;

type MonthScheduleTableCellProps = {
  date: Date;
  isDayWithinMonth: boolean;
};

export function MonthScheduleTableCell(props: MonthScheduleTableCellProps) {
  const { date, isDayWithinMonth } = props;
  const dateNumber = date.getDate();
  const cellRef = useRef<HTMLTableCellElement>(null);
  const { onDateSelect } = useMonthScheduleSharedData();

  const rootClassName = classNames('MonthSchedule__TableCell', {
    ['is-day-within-month']: isDayWithinMonth,
  });
  const taskLines = useMonthScheduleStore((state) => state.taskLines);

  const allTasksRequiredRendered = findsAllShowedTasksInTaskLine(
    taskLines,
    date,
    LINE_LIMIT
  );

  const renderTask = () => {
    return allTasksRequiredRendered.map((task, index) => {
      return (
        <MonthScheduleTask
          cellDate={date}
          cellRef={cellRef}
          index={task.index}
          taskData={task}
          key={task.id}
        />
      );
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onDateSelect) onDateSelect(date);
  };

  return (
    <td className={rootClassName} ref={cellRef} onClick={handleClick}>
      <div className="TableDateCell__Container">
        <div className="TableDateCell__DateNumber">{dateNumber}</div>
        <div className="TableDateCell__TasksLines">{renderTask()}</div>
        <MonthScheduleTasksExpandButton
          currDate={date}
          lineLimit={LINE_LIMIT}
          anchorRef={cellRef}
        />
      </div>
    </td>
  );
}
