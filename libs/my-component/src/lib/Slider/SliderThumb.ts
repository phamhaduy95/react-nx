import { MouseHandler } from "./RangeSliderHandler";

type Handlers = {
  handleThumbMouseDown: MouseHandler;
  handleGlobalMouseUp: MouseHandler;
};

export default class SliderThumb {
  private ref: HTMLElement;
  private handlers: Handlers;
  isActive: boolean = false;
  private currentPosition: number = 0;

  constructor(ref: HTMLElement) {
    this.ref = ref;
    this.handlers = this.getEventHandler();
  }

  getCurrentPosition(): number {
    return this.currentPosition;
  }
  setCurrentPosition(newPosition: number) {
    this.currentPosition = newPosition;
  }

  getThumbWidth(): number {
    const { width } = this.ref.getBoundingClientRect();
    return width;
  }

  toggleActive(state: boolean) {
    this.isActive = state;
    if (state) this.ref.classList.add("active");
    else this.ref.classList.remove("active");
  }

  getEventHandler(): Handlers {
    const ref = this;
    const handleThumbMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      ref.toggleActive(true);
    };

    const handleGlobalMouseUp = (event: MouseEvent) => {
      if (ref.isActive) {
        event.preventDefault();
        ref.toggleActive(false);
      }
    };

    return { handleThumbMouseDown, handleGlobalMouseUp };
  }

  addEventListener() {
    const { handleThumbMouseDown, handleGlobalMouseUp } = this.handlers;
    this.ref.addEventListener("mousedown", handleThumbMouseDown);
    document.addEventListener("mouseup", handleGlobalMouseUp);
  }

  removeEventListener() {
    const { handleThumbMouseDown, handleGlobalMouseUp } = this.handlers;
    this.ref.removeEventListener("mousedown", handleThumbMouseDown);
    document.removeEventListener("mouseup", handleGlobalMouseUp);
  }

  moveThumbTo(newPosition: number) {
    const haftThumbWidth = Math.round(this.getThumbWidth() / 2);
    const leftOffset = Math.round(newPosition - haftThumbWidth);

    this.ref.style.setProperty("--position", `${leftOffset}px`);
    this.setCurrentPosition(newPosition);
  }
}
