import React from 'react';
import * as d3 from "d3";

function DebtChart({  debtChartColors, chartData }) {
  /* 
    calculateMonthlyPayment will get the monthly payment for a debt using its owed amount, term, and interest rate.
    calculateData to get all monthly payments for debts, then sorts those payments from high-to-low and passes it to populate data.
    populateData takes a sorted array and will take the 5 largest values to use for populating the pie chart. 
  */
  const data = chartData

  // Dimensions and colors for the pie chart
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal(debtChartColors)

  const pie = d3.pie().value((d) => d.value);

  const svg = d3
    .select("#pie-svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`)

  // Generate the pie chart
  const arcs = svg.selectAll("arc").data(pie(data)).enter();

  // Append paths for chart segments
  arcs
    .append("path")
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", (d) => color(d.data.id));


  return (
    <svg id="pie-svg" />
  )
}



export default DebtChart