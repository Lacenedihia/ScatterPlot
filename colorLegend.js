export const colorLegend = (
  selection,
  {
    colorScale,
    colorLegendLabel,
    colorLegendX,
    colorLegendY,
    tickSpacing = 35,
    tickPadding = 25,
    colorLegendLabelX = -10,
    colorLegendLabelY = -11,
    setHoveredValue,
    hoveredValue,
  }
) => {
  const colorLegendG = selection
    .selectAll('g.color-legend')
    .data([null])
    .join('g')
    .attr('class', 'color-legend')
    .attr(
      'transform',
      `translate(${colorLegendX},${colorLegendY})`
    );


  colorLegendG
    .selectAll('text.color-legend-label')
    .data([null])
    .join('text')
    .attr('x', colorLegendLabelX - 10)
    .attr('y', colorLegendLabelY - 15)
    .attr('class', 'color-legend-label')
    .attr('font-family', 'sans-serif')
    .attr('font-size', "5vh")
    .text(colorLegendLabel);

  colorLegendG
    .selectAll('g.tick')
    .data(colorScale.domain())
    .join((enter) =>
      enter
        .append('g')
        .attr('class', 'tick')
        .call((selection) => {
          selection.append('circle');
          selection.append('text');
        })
    )
    .attr(
      'transform',
      (d, i) => `translate(0, ${i * tickSpacing})`
    )
    .attr('font-size', "(3vw+2vh)/2")
    .attr('font-family', 'sans-serif')
    .call((selection) => {
      selection
        .select('circle')
        .attr('r', '1.5vh')
        .attr('fill', colorScale);
      selection
        .select('text')
        .attr('dy', '0.28em')
        .attr('x', tickPadding)
        .style('user-select', 'none')
        .text((d) => d);
    })
    .attr('opacity', (d) =>
      hoveredValue
        ? d === hoveredValue
          ? 1
          : 0.2
        : 0.8
    )
    .on('mouseover', (event, d) => {
      setHoveredValue(d);
    })
    .on('mouseout', () => {
      setHoveredValue(null);
    });
};
