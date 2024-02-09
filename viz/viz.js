import { csvParse, select } from 'd3';
import { scatterPlot } from './scatterPlot';

export const viz = (
  container,
  { state, setState }
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An array of objects
  const { data, hoveredValue } = state;

  const setHoveredValue = (d) => {
    setState((state) => ({
      ...state,
      hoveredValue: d,
    }));
  };

  if (data && data !== 'LOADING') {
    svg.call(scatterPlot, {
      data,
      width,
      height,
      xValue: (d) => d.sepal_length,
      yValue: (d) => d.petal_length,
      colorValue: (d) => d.species,
      xAxisLabel: 'Sepal Length',
      yAxisLabel: 'Petal Length',
      colorLegendLabel: 'Species',
      margin: {
        top: 70,
        right: 70,
        bottom: 90,
        left: 120,
      },
      colorLegendX: 1350,
      colorLegendY: 370,
      setHoveredValue,
      hoveredValue
    });
  }

  if (data === undefined) {
    setState((state) => ({
      ...state,
      data: 'LOADING',
    }));
    fetch('data.csv')
      .then((response) => response.text())
      .then((csvString) => {
        const data = csvParse(csvString);

        for (const d of data) {
          d.petal_length = +d.petal_length;
          d.petal_width = +d.petal_width;
          d.sepal_length = +d.sepal_length;
          d.sepal_width = +d.sepal_width;
        }

        setState((state) => ({
          ...state,
          data,
        }));
      });
  }
};
