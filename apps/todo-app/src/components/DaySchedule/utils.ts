import dayjs from "dayjs";

export function getTimeRatioInPercentage(date: Date, baseDate: Date) {
    const baseTime = dayjs(baseDate).hour(0).minute(0);
    const calculatedDiff = dayjs(date).diff(baseTime, 'minute');
    const timeDiff =
      calculatedDiff < 0
        ? 0
        : calculatedDiff > 24 * 60
        ? 24 * 60
        : calculatedDiff;
    const ratio = (100 * timeDiff) / (24 * 60);
    return ratio;
  }