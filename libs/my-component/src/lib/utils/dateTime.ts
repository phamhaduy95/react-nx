export function extractTimeFromDate(date: Date|null) {
    if (date === null) return {hour:0,minute:0,second:0}
    const hour = date.getHours();
    const second = date.getSeconds();
    const minute = date.getMinutes();
    return { hour, second, minute };
  }