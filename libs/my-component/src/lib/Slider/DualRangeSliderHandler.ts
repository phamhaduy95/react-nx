import Slider from './Slider';
import SliderThumb from './SliderThumb';
import { MouseHandler } from './RangeSliderHandler';
import SliderProgressLine from './SliderProgressLine';
import minMax from './minMax';
import RangeNumber from './RangeNumber';
import { RangeValue } from './DualRangeSlider';

type WhichThumb = 'lower' | 'upper';

type Handlers = {
  handleSliderClick: MouseHandler;
  handleGlobalMouseMove: MouseHandler;
};

export default class DualRangeSliderHandler {
  private slider: Slider;
  private lowerThumb: SliderThumb;
  private upperThumb: SliderThumb;
  private progressLine: SliderProgressLine;
  private rangeNumber: RangeNumber;
  private handlers: Handlers;
  private onValueChanged: (newValue: RangeValue) => void;
  private value: RangeValue;
  constructor(
    slider: HTMLElement,
    progressLine: HTMLElement,
    lowerThumb: HTMLElement,
    upperThumb: HTMLElement,
    rangeNumber: RangeNumber,
    onValueChanged: (newValue: RangeValue) => void,
    initialValue: RangeValue
  ) {
    this.slider = new Slider(slider);
    this.lowerThumb = new SliderThumb(lowerThumb);
    this.upperThumb = new SliderThumb(upperThumb);
    this.progressLine = new SliderProgressLine(progressLine);
    this.setInitialThumbsPosition(0.25, 0.75);
    this.rangeNumber = rangeNumber;
    this.onValueChanged = onValueChanged;
    this.value = initialValue;
    this.handlers = this.getEventHandler();
    this.addEventListener();
  }

  private setInitialThumbsPosition(lowerLimit: number, upperLimit: number) {
    const { left, right } = this.slider.getSliderPosition();
    const sliderWidth = right - left;
    const lowerThumbPosition = Math.round(lowerLimit * sliderWidth);
    const upperThumbPosition = Math.round(upperLimit * sliderWidth);
    this.lowerThumb.moveThumbTo(lowerThumbPosition);
    this.upperThumb.moveThumbTo(upperThumbPosition);
    this.progressLine.setWidth(lowerThumbPosition, upperThumbPosition);
  }

  private setInitialValue(lowerLimit: number, upperLimit: number) {
    return { low: lowerLimit, high: upperLimit };
  }

  private getEventHandler(): Handlers {
    const ref = this;
    const handleSliderClick = (event: MouseEvent) => {
      const newThumbPosition = ref.calculateNewThumbPosition(event.clientX);
      const upperThumbPosition = ref.upperThumb.getCurrentPosition();
      const lowerThumbPosition = ref.lowerThumb.getCurrentPosition();
      const middlePoint = (upperThumbPosition + lowerThumbPosition) / 2;
      if (newThumbPosition < middlePoint) {
        ref.updateThumbPosition('lower', newThumbPosition);
        ref.updateValueForThumb('lower', newThumbPosition);
      } else {
        ref.updateThumbPosition('upper', newThumbPosition);
        ref.updateValueForThumb('upper', newThumbPosition);
      }
      ref.resizeProgressLine();
    };

    const handleGlobalMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (!ref.lowerThumb.isActive && !ref.upperThumb.isActive) return;
      const pointerX = event.clientX;
      const newThumbPosition = ref.calculateNewThumbPosition(pointerX);

      if (ref.lowerThumb.isActive) {
        ref.updateThumbPosition('lower', newThumbPosition);
        ref.updateValueForThumb('lower', newThumbPosition);
      } else if (ref.upperThumb.isActive) {
        ref.updateThumbPosition('upper', newThumbPosition);
        ref.updateValueForThumb('upper', newThumbPosition);
      }
      ref.resizeProgressLine();
    };

    return { handleGlobalMouseMove, handleSliderClick };
  }

  private resizeProgressLine() {
    const lowerThumbPosition = this.lowerThumb.getCurrentPosition();
    const upperThumbPosition = this.upperThumb.getCurrentPosition();
    this.progressLine.setWidth(lowerThumbPosition, upperThumbPosition);
  }

  private updateThumbPosition(
    whichThumb: 'upper' | 'lower',
    newThumbPosition: number
  ) {
    switch (whichThumb) {
      case 'upper': {
        const limitedPosition = this.limitThumbMovement(
          'upper',
          newThumbPosition
        );
        this.upperThumb.moveThumbTo(limitedPosition);
        break;
      }
      case 'lower': {
        const limitedPosition = this.limitThumbMovement(
          'lower',
          newThumbPosition
        );
        this.lowerThumb.moveThumbTo(limitedPosition);
        break;
      }
    }
  }

  private limitThumbMovement(
    whichThumb: 'upper' | 'lower',
    newThumbPosition: number
  ) {
    const lowerThumbPosition = this.lowerThumb.getCurrentPosition();
    const upperThumbPosition = this.upperThumb.getCurrentPosition();
    switch (whichThumb) {
      case 'upper':
        return Math.max(newThumbPosition, lowerThumbPosition);
      case 'lower':
        return Math.min(newThumbPosition, upperThumbPosition);
    }
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

  private updateValueForThumb(whichThumb: WhichThumb, position: number) {
    const { left, right } = this.slider.getSliderPosition();
    const sliderWidth = right - left;
    const ratio = this.rangeNumber.getRatio();
    const stepSize = this.rangeNumber.getStep();
    const absoluteValue = Math.floor(
      (position / sliderWidth) * ratio * stepSize
    );
    const offsetValue = absoluteValue + this.rangeNumber.getMin();
    switch (whichThumb) {
      case 'lower':
        this.value = { ...this.value, low: offsetValue };
        break;
      case 'upper':
        this.value = { ...this.value, high: offsetValue };
    }
    this.onValueChanged(this.value);
  }

  private calculateStepDistance(position: number): number {
    const { left, right } = this.slider.getSliderPosition();
    const sliderWidth = right - left;
    const ratio = this.rangeNumber.getRatio();
    let temp = Math.round((position / sliderWidth) * ratio);
    temp = (temp / ratio) * sliderWidth;
    return temp;
  }

  private addEventListener() {
    const { handleGlobalMouseMove, handleSliderClick } = this.handlers;
    this.slider.addClickEventListener(handleSliderClick);
    this.lowerThumb.addEventListener();
    this.upperThumb.addEventListener();
    document.addEventListener('mousemove', handleGlobalMouseMove);
  }

  removeEventListener() {
    const { handleGlobalMouseMove } = this.handlers;
    this.slider.removeEventListener();
    this.lowerThumb.removeEventListener();
    this.upperThumb.removeEventListener();
    document.removeEventListener('mousemove', handleGlobalMouseMove);
  }
}
