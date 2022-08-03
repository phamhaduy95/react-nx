import { MouseHandler } from "./RangeSliderHandler";

export default class Slider {
  private ref: HTMLElement;
  private ClickHandler: MouseHandler = () => {};
  constructor(ref: HTMLElement) {
    this.ref = ref;
  }

  getSliderPosition() {
    const { left, right } = this.ref.getBoundingClientRect();
    return { left, right };
  }

  addClickEventListener(callback: (event: MouseEvent) => void) {
    this.ClickHandler = callback;
    this.ref.addEventListener("click", this.ClickHandler);
  }

  removeEventListener() {
    this.ref.removeEventListener("click", this.ClickHandler);
  }
}
