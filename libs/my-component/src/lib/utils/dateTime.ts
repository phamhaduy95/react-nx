export function extractTimeFromDate(date: Date) {
    const hour = date.getHours();
    const second = date.getSeconds();
    const minute = date.getMinutes();
    return { hour, second, minute };
  }