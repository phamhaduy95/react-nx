type ScrollPositionType = { top: number; left: number };
type ScrollState = 'idle' | 'scrolling';

export class ScrollEventHandler {
  private callback: (e: Event) => void;
  private el: HTMLElement;
  private interval: NodeJS.Timer;
  public onScrollStart: () => void = () => {};
  public onScrolling: () => void = () => {};
  public onScrollEnd: () => void = () => {};

  constructor(scrollableElement: HTMLElement) {
    this.el = scrollableElement;
    const ref = this;
    /** initial state */
    let currScrollPos: ScrollPositionType = { top: 0, left: 0 };
    let prevScrollPos: ScrollPositionType = { ...currScrollPos };
    let scrollingState: ScrollState = 'idle';

    /** register the scroll event for element */
    this.callback = (e) => {
      const target = e.target as HTMLElement;
      currScrollPos = {
        top: target.scrollTop,
        left: target.scrollLeft,
      };
    };
    this.el.addEventListener('scroll', this.callback);

    this.interval = setInterval(() => {
      if (!compareTwoScrollPos(prevScrollPos, currScrollPos)) {
        if (scrollingState === 'idle') {
          scrollingState = 'scrolling';
          ref.onScrollStart();
          return;
        }
        ref.onScrolling();
        return;
      }
      if (scrollingState === 'scrolling') {
        scrollingState = 'idle';
        ref.onScrollEnd();
        return;
      }
    }, 10);
  }

  remove() {
    clearInterval(this.interval);
    this.el.removeEventListener('scroll', this.callback);
  }
}

function compareTwoScrollPos(
  pos1: ScrollPositionType,
  pos2: ScrollPositionType
) {
  return pos1.top === pos2.top || pos1.left === pos2.left;
}
