export function switchFocus(
  ref: React.MutableRefObject<HTMLElement | null>,
  isFocus: boolean
) {
  const el = ref.current;
  if (el === null) return;
  if (isFocus) {
    el.focus();
    return;
  }
  el.blur();
}
