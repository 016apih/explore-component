import React, { memo, useEffect, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_analytic_stock_chart } from '../data';

const AnalyticStockChart = memo(() => {
   const [id, setId] = useState(1);
   const [arrData, setArrData] = useState([]);
   const [firstdate, setFirstdate] = useState("");
   const [lastdate, setLastdate] = useState("");
   
   const chart = anychart.stock();
   const chartData = anychart.data.table();

   // set chart padding, background
   chart.padding().right(60);
   chart.background().fill("none");

   // create plot on the chart
   const plot = chart.plot(0);

   // enabled x-grid/y-grid
   plot.yGrid().enabled(true);
   plot.yGrid().stroke({color: "#555555", dash: "3 4"});
   plot.xMinorGrid().enabled(true);
   plot.xMinorGrid().stroke({color: "#555555", dash: "2 4"});

   // set orientation y-axis to the right side
   plot.yAxis().orientation('right');

   // create candlestick series on the plot
   let mapData = chartData.mapAs({ x: 0, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
   const aaplSeries = plot.candlestick(mapData);
   aaplSeries.name(`TEST CODE${id}`).zIndex(50);
   aaplSeries.risingFill('green', 0.5)
      .fallingFill('red', 0.5)
      .risingStroke('green', 0.5)
      .fallingStroke('red', 0.5);

   // create line chart with mapping volumne (hasil mapAs digunakan untuk menampilkan tooltip)
   var mapVolume = chartData.mapAs({ 'open': 1, 'high': 2, 'low': 3, 'close': 4, 'value': 5, 'volume': 5,  });
   var volumePlot = chart.plot(1);
   volumePlot.height('23%');
   volumePlot.yAxis().labels().format('{%Value}{scale:(1000)(1)|(k)}');
   volumePlot.crosshair().yLabel().format('{%Value}{scale:(1000)(1)|(k)}');

   // create volume series on the plot
   var volumeSeries1 = volumePlot.column(mapVolume);
   // set series settings
   volumeSeries1.name('Volume');
   volumeSeries1.fill("#ff6d00");
   volumeSeries1.stroke("#ff6d00");
   volumeSeries1.bottom(0);

   // disable the grouping feature
   const grouping = chart.grouping();
   grouping.enabled(false);

   chart.scroller().line(mapVolume);
   // chart.scroller().line(chartData.mapAs({'value': 4}));

   // set chart selected date/time range
   chart.selectRange(firstdate, lastdate);

   // create range picker
   let rangePicker = anychart.ui.rangePicker();
   rangePicker.render(chart); 

   // create range selector
   let rangeSelector = anychart.ui.rangeSelector(); 
   rangeSelector.render(chart);

   useEffect(() => {
      chartData.addData(arrData);
   },[ arrData ]);

   const setChartData = () => {
      let nid = (id % 2) + 1;
      let ndata = get_analytic_stock_chart(nid)
      setArrData(ndata);
      setId(id + 1);
      setFirstdate(ndata[0][0]);
      setLastdate(ndata[ndata.length - 1][0]);
   }

   return (<>
      <div>
         <button onClick={setChartData}>Set Chart Data</button>
      </div>
      <AnyChart 
         instance={chart} 
         height={600}
         id="analytic-stock-chart-container"
      />
   </>
   )
});

export default AnalyticStockChart;