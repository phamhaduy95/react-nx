import { useEffect, useRef, useState } from 'react';
import './RangeSlider.scss';
import RangeSliderHandler from './RangeSliderHandler';
import RangeNumber from './RangeNumber';

type Props = {
  className?: string;
  onValueChanged?: (newValue: number) => void;
  max: number;
  min: number;
  step?: number;
};

export default function RangeSlider(props: Props) {
  let { max, min, step, onValueChanged, className } = props;
  step = step === undefined ? 1 : step;
  className = className === undefined ? 'RangeSlider-default' : className;

  const [value, setValue] = useState<number>(min);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);
  const progressRef = useRef(null);
  function handlerValueChange(newValue: number) {
    setValue(newValue);
  }
  useEffect(() => {
    if (onValueChanged) onValueChanged(value);
  }, [value]);

  useEffect(() => {
    const slider = sliderRef.current;
    const thumb = thumbRef.current;
    const progressLine = progressRef.current;
    const rangeNumber = new RangeNumber(min, max, step);
    if (!slider || !thumb || !progressLine) return;
    const eventHandler = new RangeSliderHandler(
      slider,
      progressLine,
      thumb,
      rangeNumber,
      handlerValueChange
    );
    return () => {
      eventHandler.removeEventListener();
    };
  }, [max, min, step]);

  return (
    <div className={`RangeSlider ${className}`}>
      <div className="RangeSlider_Track" ref={sliderRef}>
        <div className="RangeSlider_Track_ProgressLine" ref={progressRef}></div>
      </div>
      <div className="RangeSlider_Thumb" ref={thumbRef} />
    </div>
  );
}
