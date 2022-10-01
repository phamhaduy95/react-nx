export function switchFocus(
  el:HTMLElement,
  isFocus: boolean
) {
  if (isFocus) {
    el.focus();
    return;
  }
  el.blur();
}
