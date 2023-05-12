import React, { memo, useEffect, useState } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.min.css'; // wajib ada untuk merapihkan tampilannya

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_stock_chart } from '../data';

let chart = anychart.stock();
let chartData = anychart.data.table();
chartData.addData(get_stock_chart(1)); // setdata

// set chart padding, background
chart.padding().right(60);
chart.background().fill("none");

// create plot on the chart
var plot = chart.plot(0);

// enabled x-grid/y-grid
plot.yGrid().enabled(true);
plot.yGrid().stroke({color: "#555555", dash: "3 4"});
plot.xMinorGrid().enabled(true);
plot.xMinorGrid().stroke({color: "#555555", dash: "2 4"});

// set orientation y-axis to the right side
plot.yAxis().orientation('right');

// create candlestick series on the plot
let mapData = chartData.mapAs({ x: 0, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
var aaplSeries = plot.candlestick(mapData);
aaplSeries.name("TEST CODE").zIndex(50);
aaplSeries.risingFill('green', 0.5)
   .fallingFill('red', 0.5)
   .risingStroke('green', 0.5)
   .fallingStroke('red', 0.5);


// disable the grouping feature
var grouping = chart.grouping();
grouping.enabled(false);

// set chart selected date/time range
chart.selectRange("2019-01-03", "2023-05-11");

let rangePicker = anychart.ui.rangePicker();
rangePicker.render(chart); // init range picker
let rangeSelector = anychart.ui.rangeSelector(); // create range selector
rangeSelector.render(chart); // init range selector

const StockChartPersistent = memo(() => {
   const [id, setId] = useState(1);

   useEffect(() => {
      let stage = anychart.graphics.create("stock-chart-container"); // create graphic chart by idname
      chart.container(stage).draw();
   },[]);

   const setChartData = () => {
      let nid = (id % 2) + 1;
      anychart.data.set(get_stock_chart(nid));
      setId(id + 1);
   }

   return (<>
      {/* <div>
         <button onClick={setChartData}>Set Chart Data</button>
      </div> */}
      <AnyChart 
         instance={chart} 
         height={600}
         id="stock-chart-container"
      />
   </>
   )
})

export default StockChartPersistent;