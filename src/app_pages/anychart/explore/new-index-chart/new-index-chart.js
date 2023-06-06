import React, { memo } from 'react';
import anychart from 'anychart';
import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { setRupiah } from '../../../generalFunction';


const NewIndexChart = memo(({ indexCode, chartData }) => {
   
   const chart = anychart.stock(); // create instance stock chart
   chart.padding(10, 50, 20, 50);
   anychart.theme(anychart.themes.defaultTheme);

   const indexchart = anychart.data.table();
   indexchart.addData(chartData);
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
   plot.legend(true);

   // mapping chartData x: time, value: price
   const mapData = indexchart.mapAs({x: 0, value: 1}); 
   const series = plot.splineArea(mapData); // create jenis chart
   // const series = plot.line(mapData); // create jenis chart
   series.stroke("var(--primary-sky)", 2); // color raw
   series.fill({ keys: [".1 #fff", "1 rgba(43, 156, 209, 0)"], angle: 90 });
   series.name("Price");

   // set format tooltip default 11 May 2023, 13:05:30 jadi13:05:30
   chart.tooltip().titleFormat('{%x}{type:time}'); 
   let backgroundTooltip = chart.tooltip().background().enabled(true);;
   backgroundTooltip.fill("var(--primary-sky)");
   // set format tooltip di bawah title
   const columnTooltip = series.tooltip();
   columnTooltip.format(e => `${e.seriesName}: ${setRupiah(e.value)}`);
   columnTooltip.displayMode("single");

   const title = chart.plot(0).legend().title();
   title.useHtml(true);
   // enable legend title
   title.enabled(true);
   title.text("&nbsp;");
   // set Font size & align
   title.fontSize(14);
   title.hAlign("center");

   chart.scroller(true);
   chart.scroller().enabled(false);

   // create range selector
   let rangeSelector = anychart.ui.rangeSelector();
   rangeSelector.render(chart);

   return (
      <AnyChart 
         instance={chart} 
         id="index-container"
      />
   )
});

export default NewIndexChart;