import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { LineChartSettings } from "./type";
// construct the tooltips svg elements which will show the XY value.
// rect will have its width and height depending on the number of Y valued and max length of text.

type Props = {
  numberOfYValue: number;
};

export default function PopUpTooltips(props: Props) {
  const {numberOfYValue} = props;
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;

  }, []);

  const renderTooltipsForYValues = () => {
    // the text showing the Y value will be managed by useEffect in the LineChart
    return d3.range(numberOfYValue).map((i) => {
      const colorScheme = d3.scaleOrdinal<number,string>(d3.schemeSet1).domain([0,numberOfYValue-1]);
      const yOffset = 1.25 * (i + 2);
      return (
        <g className="tooltips__y" key={i} style={{ transform: `translate(1em,${yOffset}em)` }}>
          <circle
            className="tooltips__y-color"
            cx={0}
            cy={0}
            r="0.3em"
            fill={colorScheme(i)}
          />
          <text
            className="tooltips__y-value"
            textAnchor="start"
            x={"0.8em"}
            y={4}
            fill="white"
            fontSize={"0.8rem"}
          >
            123
          </text>
        </g>
      );
    });
  };

  return (
    <g ref={ref} className="line-chart__tooltips">
      <rect  fill={"black"} opacity={0.5}  rx={5}
            ry={5}></rect>  
      <text
        className="tooltips__x"
        fill="white"
        fontSize="0.8rem"
        style={{ transform: "translate(1em,1.5em)" }}
      >
        125
      </text>
      {renderTooltipsForYValues()}
    </g>
  );
}

// pass
function adjustContentOnTooltips(
  el: SVGGElement,
  content: { x: string; y: string[] }
) {
  // find the xValue tooltips text and add content.x
  const xText = d3
    .select(el)
    .select<SVGTextElement>(".tooltips__x")
    .text(content.x);

  const yTexts = d3
    .select(el)
    .selectAll(".tooltips__y-value")
    .each(function (this, k, index) {
      d3.select(this).text(content.y[index]);
    });
}

function computeWidthForRectContainer(el: SVGGElement) {
  const xText = d3
    .select(el)
    .select<SVGTextElement>(".tooltips__x")
    .node();
  let max = 0;
  if (xText === null) return;
  max = xText.getComputedTextLength();

  const yNode = d3
    .select(el)
    .selectAll<SVGTextElement, any>(".tooltips__y")
    .nodes();
  if (yNode === null) return;

  yNode.forEach((node) => {
    const width = node.getBBox().width;
    if (width >=max ) max = width;
  });
  return Math.floor(max*1.5);
}

function resizeRectInsideTooltips(
  el: SVGGElement,
  newWidth: number,
  numberOfYValue: number
) {
  const rect = {
    width: `${newWidth}px`,
    height: `${(numberOfYValue + 1) * 1.5 + 0.5}em`,
  };

  const rectEl = d3
    .select(el)
    .select("rect")
    .style("width", rect.width)
    .style("height", rect.height);
}

export function toggleToolTipsDisplay(tooltipEl:SVGGElement,open:boolean){
  if (!open){ 
    d3.select(tooltipEl).attr("opacity",0);
    return;
  }
  d3.select(tooltipEl).attr("opacity",1);
}

export function updateToolTipsContent(el:SVGGElement,contents:{x:string,y:string[]},open:boolean){
    adjustContentOnTooltips(el,contents);
    const width = computeWidthForRectContainer(el) as number;
    resizeRectInsideTooltips(el,width,contents.y.length);
}


export function updateToolTipsPosition(tooltipEl:SVGGElement,supposedPos:{x:number,y:number},axis:LineChartSettings["axis"]){
  
  const {x,y} = computeTooltipsNewPosition(tooltipEl,supposedPos,axis);
  d3.select(tooltipEl).attr("transform",`translate(${x},${y})`)
}

function computeTooltipsNewPosition(tooltipEl:SVGGElement,supposedPos:{x:number,y:number},axis:LineChartSettings["axis"]){
  const offset = 10;
  const rect = d3.select("rect");
  const rectNode = rect.node() as SVGRectElement;
  const rectSize = rectNode.getBBox();

  let newX = supposedPos.x - offset - rectSize.width;
  let newY = 0;

  newX =(newX < 0)?(supposedPos.x + offset):newX;
  if (supposedPos.y + rectSize.height/2> axis.YLength + axis.offsetY)
    newY = supposedPos.y - rectSize.height - offset;
  else if(supposedPos.y - rectSize.height/2 < axis.offsetY) {
    newY = supposedPos.y + rectSize.height + offset;
  }
  else {
    newY =supposedPos.y - rectSize.height/2;
  }
  

  return {x:newX,y:newY}; 
  
}