export function getOffsetPositionOnPageOf(element: HTMLElement) {
  const { top, left } = element.getBoundingClientRect();
  return {
    top: top +window.scrollY,
    left: left+window.scrollX,
  };
}
export function getSizeOf(element: HTMLElement) {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}

export function transformToPixel(number: number) {
  return `${number}px`;
}
