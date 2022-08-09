import dayjs from 'dayjs';
import { useMemo } from 'react';

export type CalendarTableData = {
  date: Date;
  isDayWithinMonth: boolean;
}[][];

function generateCalendarRow(startDate: dayjs.Dayjs,lastDateInMonth:dayjs.Dayjs) {
  const array = [];
  const startDay = startDate.day();
  for (let i = 0; i < 7; i++) {
    const elapsedDays = i - startDay;
    const date = startDate.add(elapsedDays, 'day');
    let isDayWithinMonth = true;
    if (elapsedDays < 0 || date.isAfter(lastDateInMonth))
      isDayWithinMonth = false;
    const dateData = {
      date: date.toDate(),
      isDayWithinMonth: isDayWithinMonth,
    } as CalendarTableData[number][number];
    array.push(dateData);
  }
  return array;
}

export function useGenerateCalendarData(year: number, month: number) {
  const calendarData = useMemo(()=>{
    const firstDate = dayjs(new Date(year, month, 1));
    const table = [];
    let startDate = firstDate;
    let lastDate = firstDate.endOf("month");
    while (true) {
      const row = generateCalendarRow(startDate,lastDate);
      table.push(row);
      const isInTargetMonth = row[6].isDayWithinMonth;
      if (!isInTargetMonth) break;
      startDate = dayjs(row[6].date).add(1, 'day');
      if (startDate.isAfter(lastDate)) break;
    }
    return table;
  },[year,month]);
 
  return calendarData;
}
