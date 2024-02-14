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
    colorLegendLabelY = -24,
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
    .attr('x', colorLegendLabelX - 12)
    .attr('y', colorLegendLabelY - 15)
    .attr('class', 'color-legend-label')
    .attr('font-family', 'sans-serif')
    .attr('font-size', "4vw")
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
    .attr('font-size', "2.5vw")
    .attr('font-family', 'sans-serif')
    .call((selection) => {
      selection
        .select('circle')
        .attr('r', 11)
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
        : 1
    )
    .on('mouseover', (event, d) => {
      setHoveredValue(d);
    })
    .on('mouseout', () => {
      setHoveredValue(null);
    });
};
