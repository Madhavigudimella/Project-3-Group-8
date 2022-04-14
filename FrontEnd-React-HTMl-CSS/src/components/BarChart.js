import React, { useRef, useEffect } from "react";
import { Typography } from "@mui/material";
import * as d3 from "d3";
import { max } from "d3";

function BarChart({ data, graphType }) {
  const margin = {
    top: 10,
    right: 20,
    bottom: 10,
    left: 20,
  };
  const svgRef = useRef();
  useEffect(() => {
    const w = 1700;
    const h = 400;
    let xValues, yValues;
    xValues = d3.map(data, (datum) => datum.name);
    yValues = d3.map(data, (datum) => datum.followers);
    if (xValues && xValues.length > 0) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible")
        .style("marginTop", "75px");
      d3.selectAll("g").remove();
      d3.selectAll("text").remove();
      const xDomain = d3.groupSort(
        data,
        (group) => d3.max(group, (datum) => -datum.name),
        (datum) => datum.name
      );
      const yDomain = [0, max(yValues)];

      const xscale = d3
        .scaleBand()
        .domain(xDomain)
        .range([0, w - margin.right])
        .padding(0.1)
        .round(true);
      const yscale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([h, margin.top])
        .interpolate(d3.interpolateRound);

      const xAxis = d3.axisBottom(xscale).tickSizeOuter(0);
      const yAxis = d3.axisLeft(yscale).ticks(10);
      svg
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${h})`);
      svg.append("g").call(yAxis);

      svg
        .append("g")
        .attr("fill", "#0084FF")
        .selectAll("rect")
        .data(xValues.keys())
        .join("rect")
        .attr("className", "bar")
        .attr("x", (i) => xscale(xValues[i]))
        .attr("y", (i) => yscale(yValues[i]))
        .attr("height", (i) => yscale(0) - yscale(yValues[i]))
        .attr("width", xscale.bandwidth())
        .on("mouseover", function() {
          d3.select(this).attr("fill", "#135CA1");
        })
        .on("mouseout", function() {
          d3.select(this).attr("fill", "#0084FF");
        });
      let barWidth = 0;
      svg.selectAll("rect").each(function() {
        barWidth = this.getBBox().width;
      });
    }
  }, [data]);

  return (
    <div className="barDiv">
      <Typography align={"center"} color={"textPrimary"} variant={"h4"} noWrap>
        Top Influencers
      </Typography>
      <div>
        <svg ref={svgRef} />
      </div>
    </div>
  );
}

export default BarChart;
