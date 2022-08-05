import * as d3 from 'd3';
import { useRef } from 'react';
import PieArc from './PieArc';
import { PieDataSetType } from './type';
import { getColorString } from './utils';

/** The PieChart version 2 was designed with the initial intention to have the React as the main approach to manage elements while using several utilities api from d3 to process the data or prepare value for some svg-only attribute such as d from path element. This approach seems tp be bigger in code size but enables some React powerful feature for managing component and performance efficiency. */

type Props = {
  dataSet: PieDataSetType;
  widthInPixel: number;
  heightInPixel: number;
};

type DataType = PieDataSetType[number];

export default function PieChart(props: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  const { dataSet, widthInPixel, heightInPixel } = props;
  function renderPieArcs() {
    const piesLayOut = d3
      .pie<any, DataType>()
      .value((d) => d.value)
      .sort(null)(dataSet);
    return piesLayOut.map((data, i) => {
      return (
        <PieArc
          pieData={data}
          fillColor={getColorString(i)}
          key={data.data.key}
          index={i}
        />
      );
    });
  }

  return (
    <svg
      className="pie-chart"
      viewBox="-151,-151 302,302"
      width={`${widthInPixel}px`}
      height={`${heightInPixel}px`}
      ref={ref}
    >
      <g>{renderPieArcs()}</g>
    </svg>
  );
}
