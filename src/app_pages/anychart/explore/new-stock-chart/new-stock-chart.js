import React, { memo, useEffect } from 'react';
import anychart from 'anychart';
import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { setRupiah } from '../../../generalFunction';

const NewStockChart = memo(({ chartSeries, chartCode, chartData, chartRange }) => {
   
   const chart = anychart.stock(); // create instance stock chart
   chart.padding(10, 50, 20, 10);
   anychart.theme(anychart.themes.defaultTheme);

   const dataset = anychart.data.table();
   dataset.addData(chartData);
   const plot = chart.plot(0);

   // create grid, x-axis, y-axis
   plot.yGrid().enabled(true); 
   plot.yGrid().stroke({ color: "var(--netral-grey-ash)"});
   plot.xMinorGrid().enabled(false);
   plot.yAxis().orientation('right');
   // limits length of the x-axis labels to 3 or less
   plot.yAxis().labels().format(e => setRupiah(e.value));

   // set crosshair
   plot.crosshair().yLabel().format(e => setRupiah(e.value));
   // configure the appearance of the y-label
   chart.crosshair().yLabel().background({ fill: "var(--primary-sky)" });
   chart.crosshair().xLabel().background({ fill: "var(--primary-sky)" });

   // enable html for the legend title
   plot.legend(false);

   // mapping chartData x: time, value: price
   let mapData = dataset.mapAs({ x: 0, value: 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
   const series = plot[chartSeries](mapData); // create candlestick / splineArea chart
   if(chartCode?.code && chartSeries === "candlestick"){
      series.name(chartCode?.code).zIndex(50);
      series.risingFill('var(--secondary-success)', 0.9)
         .fallingFill('var(--secondary-sky)', 0.9)
         .risingStroke('var(--secondary-success)', 0.9)
         .fallingStroke('var(--secondary-sky)', 0.9);
   } else {
      series.stroke("var(--primary-sky)", 2); // color raw
      series.fill({ keys: [".1 #fff", "1 rgba(43, 156, 209, 0)"], angle: 90 });
      series.name("Price");
   }

   let backgroundTooltip = chart.tooltip().background().enabled(true);;
   backgroundTooltip.fill("var(--primary-sky)");

   chart.scroller(true);
   chart.scroller().enabled(false);

   useEffect(() => {
      if(chartRange.type === "Unit"){
         let { unit, count } = chartRange;
         chart.selectRange(unit, count, 'first-date', true);
         chart.draw()
      }
   }, [ chartRange ])

   return (
      <AnyChart 
         instance={chart} 
         id="index-container"
      />
   )
});

export default NewStockChart;