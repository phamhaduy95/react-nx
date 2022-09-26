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

export function isElementFocus(el:HTMLElement|null){
  if (el === null) return false;
  const activeEl = document.activeElement;
  if (activeEl === el) return true;
  return false;
}