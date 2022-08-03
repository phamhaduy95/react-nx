import { useEffect, useRef, useState } from "react";
import "./DualRangeSlider.scss";
import DualRangeSliderHandler from "./DualRangeSliderHandler";
import RangeNumber from "./RangeNumber";


type Props = {
  className?: string;
  max: number;
  min: number;
  step?: number;
  onValueChanged: (lower: number, upper: number) => void;
  initialValue: RangeValue;
};

export type RangeValue = {
  low: number;
  high: number;
};

export default function DualRangeSlider(props: Props) {
  const { max, min, initialValue } = props;
  let { className, onValueChanged, step } = props;
  const { low: initialLow, high: initialHigh } = initialValue;

  step = step === undefined ? 1 : step;
  className = step == undefined ? "DualRangeSlider-default" : className;

  const [value, setValue] = useState<RangeValue>(initialValue);
  const sliderRef = useRef(null);
  const lowerThumbRef = useRef(null);
  const upperThumbRef = useRef(null);
  const progressRef = useRef(null);

  const handleValueChange = (newValue: RangeValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const { low, high } = value;
    if (onValueChanged) onValueChanged(low, high);
  }, [value]);

  useEffect(() => {
    const slider = sliderRef.current;
    const lowerThumb = lowerThumbRef.current;
    const upperThumb = upperThumbRef.current;
    const progressLine = progressRef.current;
    const range = new RangeNumber(min, max, step);
    if (slider && lowerThumb && progressLine && upperThumb) {
      const handler = new DualRangeSliderHandler(
        slider,
        progressLine,
        lowerThumb,
        upperThumb,
        range,
        handleValueChange,
        initialValue
      );

      return () => {
        handler.removeEventListener();
      };
    }
  }, [max, min, initialHigh, initialLow]);

  return (
    <div className={`DualRangeSlider ${className}`}>
      <div className="RangeSlider_Track" ref={sliderRef}>
        <div className="RangeSlider_Track_ProgressLine" ref={progressRef}></div>
      </div>
      <div className="RangeSlider_Thumb Lower" ref={lowerThumbRef}></div>
      <div className="RangeSlider_Thumb Upper" ref={upperThumbRef}></div>
    </div>
  );
}
