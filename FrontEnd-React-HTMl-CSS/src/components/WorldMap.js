import React, { useRef, useEffect } from "react";
import { Typography } from "@mui/material";
import * as d3 from "d3";
function WorldMap({ dataMap }) {
  const svgRef = useRef();
  useEffect(() => {
    const width = 1000;
    const height = 900;
    if (dataMap && dataMap.length > 0) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      const path = d3.geoPath();
      const projection = d3
        .geoMercator()
        .scale(150)
        .center([0, 20])
        .translate([width / 2, height / 2]);

      let data = new Map();
      const colorScale = d3
        .scaleThreshold()
        .domain([100000, 1000000, 10000000, 30000000, 100000000, 200000000])
        .range(d3.schemeBlues[7]);

      Promise.all([
        d3.json(
          "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        ),
      ]).then(function(loadData) {
        let topo = loadData[0];

        svg
          .append("g")
          .selectAll("path")
          .data(topo.features)
          .join("path")

          .attr("d", d3.geoPath().projection(projection))

          .attr("fill", function(d) {
            let x = dataMap.find((element) => {
              return element.audience_country == d.properties.name;
            });

            if (x) {
              return colorScale(x.followers);
            }
            return colorScale(0);
          });
      });
    }
  }, [dataMap]);
  return (
    <div className="mapDiv">
      <Typography
        align={"center"}
        color={"textPrimary"}
        variant={"h4"}
        noWrap
        sx={{ marginBottom: 5 }}
      >
        Follower Density
      </Typography>
      <div>
        <svg ref={svgRef} />
      </div>
    </div>
  );
}

export default WorldMap;
