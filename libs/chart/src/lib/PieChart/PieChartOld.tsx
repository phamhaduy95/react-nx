import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import "./PieChart.css";



type DataType = {
  name: string;
  value: number;
};

const dataSet: DataType[] = [
  { name: "Daniel", value: 100 },
  { name: "Beck", value: 261 },
  { name: "Valois", value: 125 },
  { name: "Good", value: 120 },
];

// this pie chart version utilizes everything provided by d3 library from appending, removing, preparing data and sketching the arc to represent each data. Normally, we delegate element managing tasks such as mounting, unmounting or modifying element attribute to React but not in this case. As result, it performs worse than pure React version since its does not have virtual DOM support.
 
export default function PieChartOld() {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    let svg = d3.select(el);
    if (svg.selectAll("g").size() <= 0) {
      svg.append("g");
    }
    let g = svg.select("g");
    let arcMkr = d3
      .arc<any, d3.PieArcDatum<DataType>>()
      .innerRadius(0)
      .outerRadius(1)
      .cornerRadius(0);

    const newArc = d3.arc().innerRadius(0).outerRadius(150);
    var pies = d3.pie<any, DataType>().value((d) => d.value)(dataSet)
    var scC = d3
      .scaleOrdinal(d3.schemePastel2)
      .domain(pies.map((d) => d.index.toString()));

    g.selectAll<any,d3.PieArcDatum<DataType>>("path.pie")
      .data(pies,(d)=>d.data.name)
      .enter()
      .append("path")
      .classed("pie", true)
      .attr("d",arcMkr)
      .attr("fill", (d) => scC(d.index.toString()))
      .attr("stroke", "grey");

    const b = g.selectAll<Element, any>("path.pie").attr("d", arcMkr);
    b.transition("ok")
      .duration(1000)
      .delay((d, i) => i * 100)
      // the transition must be set before any change in attribute to make transition work
      .attr("d", newArc);

    g.selectAll("text")
      .data(pies)
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => arcMkr.innerRadius(85).centroid(d)[0])
      .attr("y", (d) => arcMkr.innerRadius(85).centroid(d)[1])
      .attr("font-family", "san-serif")
      .attr("font-size", 14)
      .attr("text-anchor", "middle");

    g.selectAll<Element, d3.PieArcDatum<DataType>>("path.pie").on(
      "click",
      function (this, e: any, d) {
        const target = e.target as Element;
        const newArc = arcMkr.innerRadius(0).outerRadius(120);
        d3.select<Element, any>(target)
          .transition()
          .duration(1000)
          .delay((d, i) => 200 * i)
          .attr("d", newArc);
      }
    );
    return () => {
      g.selectAll("path.pie").on("click", null);
    };
  }, []);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="250px"
        height="250px"
        viewBox="-151,-151 302,302"
        ref={ref}
      />
    </>
  );
}
