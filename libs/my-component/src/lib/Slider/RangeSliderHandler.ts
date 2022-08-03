import minMax from "./minMax";
import Slider from "./Slider";
import SliderProgressLine from "./SliderProgressLine";
import SliderThumb from "./SliderThumb";
import RangeNumber from "./RangeNumber";

export type MouseHandler = (event: MouseEvent) => void;

type Handler = {
  handleSliderClick: MouseHandler;
  handleGlobalMouseMove: MouseHandler;
};

export default class RangeSliderHandler {
  private slider: Slider;
  private thumb: SliderThumb;
  private progressLine: SliderProgressLine;
  private handlers: Handler;
  private rangeNumber: RangeNumber;
  private onValueChanged: (newValue: number) => void;

  constructor(
    slider: HTMLElement,
    progressLine: HTMLElement,
    thumb: HTMLElement,
    rangeNumber: RangeNumber,
    onValueChanged: (newValue: number) => void
  ) {
    this.slider = new Slider(slider);
    this.progressLine = new SliderProgressLine(progressLine);
    this.thumb = new SliderThumb(thumb);
    this.handlers = this.getEventHandler();
    this.onValueChanged = onValueChanged;
    this.rangeNumber = rangeNumber;
    this.addEventListener();
  }

  private getEventHandler(): Handler {
    const ref = this;
    const handleSliderClick = (event: MouseEvent) => {
      event.preventDefault();
      const newThumbPosition = ref.calculateNewThumbPosition(event.clientX);
      ref.updateValue(newThumbPosition);
      ref.thumb.moveThumbTo(newThumbPosition);
      ref.progressLine.setWidth(0, newThumbPosition);
    };

    const handleGlobalMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (ref.thumb.isActive) {
        const newThumbPosition = ref.calculateNewThumbPosition(event.clientX);
        ref.updateValue(newThumbPosition);
        ref.thumb.moveThumbTo(newThumbPosition);
        ref.progressLine.setWidth(0, newThumbPosition);
      }
    };

    return {
      handleSliderClick,
      handleGlobalMouseMove,
    };
  }

  private calculateNewThumbPosition(pointerX: number) {
    const { left, right } = this.slider.getSliderPosition();
    const sliderWidth = right - left;

    const pointerPositionOnSlider = pointerX - left;
    const temp = this.calculateStepDistance(pointerPositionOnSlider);
    const upperLimit = sliderWidth;
    const newThumbPosition = minMax(temp, 0, upperLimit);
    return newThumbPosition;
  }

  private updateValue(position: number) {
    const { left, right } = this.slider.getSliderPosition();
    const sliderWidth = right - left;
    const ratio = this.rangeNumber.getRatio();
    const stepSize = this.rangeNumber.getStep();
    const absoluteValue = Math.round((position / sliderWidth) * ratio * stepSize);
    const offsetValue = absoluteValue + this.rangeNumber.getMin();
    this.onValueChanged(offsetValue);
  }

  private calculateStepDistance(position: number): number {
    const { left, right } = this.slider.getSliderPosition();
    const sliderWidth = right - left;
    const ratio = this.rangeNumber.getRatio();
    let temp = Math.round((position / sliderWidth) * ratio);
    temp = (temp / ratio) * sliderWidth;
    return Math.round(temp);
  }

  addEventListener() {
    const { handleSliderClick, handleGlobalMouseMove } = this.handlers;

    this.slider.addClickEventListener(handleSliderClick);
    this.thumb.addEventListener();
    document.addEventListener("mousemove", handleGlobalMouseMove);
  }

  removeEventListener() {
    const { handleGlobalMouseMove } = this.handlers;
    this.slider.removeEventListener();
    this.thumb.removeEventListener();
    document.removeEventListener("mousemove", handleGlobalMouseMove);
  }
}
