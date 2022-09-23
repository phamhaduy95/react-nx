export function checkIsClickOnElement(e: MouseEvent, el: HTMLElement) {
    const { clientX, clientY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    if (
      clientY >= top &&
      clientY <= top + height &&
      clientX >= left &&
      clientX <= left + width
    )
      return true;
    return false;
  }