import { axisLeft, axisBottom } from 'd3';

export const axes = (
  selection,
  {
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset = 30,
    yAxisLabelOffset = 45,
  }
) => {
  selection
    .selectAll('g.y-axis')
    .data([null])
    .join('g')
    .attr('class', 'y-axis')
    .attr(
      'transform',
      `translate(${xScale.range()[0]},0)`
    )
    .call(axisLeft(yScale));

  selection
    .selectAll('g.x-axis')
    .data([null])
    .join('g')
    .attr('class', 'x-axis')
    .attr(
      'transform',
      `translate(0,${yScale.range()[0]})`
    )
    .call(axisBottom(xScale));

  selection
    .selectAll('text.x-axis-label')
    .data([null])
    .join('text')
    .attr(
      'x',
      (xScale.range()[1] + xScale.range()[0]) / 2
    )
    .attr(
      'y',
      yScale.range()[0] + xAxisLabelOffset
    )
    .attr('class', 'x-axis-label')
    .attr('alignment-baseline', 'hanging')
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', "6vh")
    .text(xAxisLabel);

  selection
    .selectAll('text.y-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('font-family', 'sans-serif')
    .attr(
      'x',
      -(yScale.range()[0] + yScale.range()[1]) / 2
    )
    .attr(
      'y',
      xScale.range()[0] - yAxisLabelOffset
    )
    .attr('font-size', "6vh")
    .text(yAxisLabel);
};