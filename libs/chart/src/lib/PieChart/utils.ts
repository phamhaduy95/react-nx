import { PieDataSetType } from "./type";
import * as d3 from "d3";

type DataType = PieDataSetType[number];

export function displayText(
  textEl: SVGTextElement,
  pieData: d3.PieArcDatum<DataType>,
  arcMkr: d3.Arc<any, d3.PieArcDatum<DataType>>
) {
  textEl.textContent = pieData.data.key;
  const posX = arcMkr.innerRadius(85).centroid(pieData)[0];
  const posY = arcMkr.innerRadius(85).centroid(pieData)[1];
  textEl.setAttribute("x", `${posX}px`);
  textEl.setAttribute("y", `${posY}px`);
}

export function getColorString(index: number): string {
  const array = d3.schemePastel1;
  const size = array.length;
  if (index < 0) index = size - 1;
  else if (index >= size) index = 0;
  return array[index];
}
