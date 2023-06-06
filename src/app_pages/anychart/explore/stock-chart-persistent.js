import React, { memo, useEffect, useState } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.min.css'; // wajib ada untuk merapihkan tampilannya

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_stock_chart, get_stock_code } from '../data';
import { SelectComponent } from '../../../app_components';


const StockChartPersistent = memo(() => {
   const [id, setId] = useState(1);
   const [codeList, setCodeList] = useState(get_stock_code());
   const [code, setCode] = useState(null);

   const [arrData, setArrData] = useState([]);
   const [firstdate, setFirstdate] = useState("");
   const [lastdate, setLastdate] = useState("");

   const chart = anychart.stock();
   const chartData = anychart.data.table();
   anychart.theme(anychart.themes.defaultTheme);

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


   // disable the grouping feature
   const grouping = chart.grouping();
   grouping.enabled(false);

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
      let ndata = get_stock_chart(nid)
      setArrData(ndata);
      setId(id + 1);
      setFirstdate(ndata[0][0]);
      setLastdate(ndata[ndata.length - 1][0]);
   }

   const onSelectedCode = (e) => {
      setCode(e);
      setArrData(get_stock_chart(e.value));
   }

   return (<>
      <div className="row">
         <div className="col-sm-3">
            <SelectComponent
               options={codeList}
               onChange={onSelectedCode}
               value={code}
            />
         </div>
      </div>
      <AnyChart 
         instance={chart} 
         height={600}
         id="stock-chart-container"
      />
   </>
   )
})

export default StockChartPersistent;