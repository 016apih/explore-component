import React, { memo, useEffect, useState } from 'react';
import anychart from 'anychart';
import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

import { get_index_stream_data } from '../data';

const IndexStreamChart = memo(({ chartData }) => {
   // const [chartData, setChartData] = useState(chartData);
   const [isStream, setIsStream] = useState(false);

   const chart = anychart.stock(); // create instance stock chart
   anychart.theme(anychart.themes.defaultTheme);

   const indexchart = anychart.data.table();
   indexchart.addData(chartData);
   const seriesRaw = chart.plot(0);
   let streamData;

   // create grid
   seriesRaw.yGrid().enabled(true); // set grid (kotak-kotak)
   seriesRaw.yGrid().stroke({ color: "#555555", dash: "3 4"}); // dash: "ketebalan kerapatan"
   seriesRaw.xMinorGrid().enabled(true);
   seriesRaw.xMinorGrid().stroke({ color: "#555555", dash: "2 4"})

   chart.crosshair().xLabel().format(' ');

   chart.plot(0).legend(true);

   const mapData = indexchart.mapAs({x: 0, value: 1}); // x: time, value: price

   const series = seriesRaw.line(mapData); // create jenis chart
   series.stroke("#64B5F6"); // color raw
   series.name("Price");

   chart.tooltip().titleFormat('{%x}{type:time}'); // set format tooltip default 11 May 2023, 13:05:30 jadi13:05:30
   const columnTooltip = series.tooltip();
   columnTooltip.format(`{%seriesName}: {%value}`); // set format tooltip di bawah title

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

   useEffect(() => {
      
      return () => clearInterval(streamData);
   }, [chartData])

   const onStreamChart = (e, val) => {
      e.preventDefault()
      let id = 0
      console.log(isStream, val)
      if(val){
         clearInterval(streamData);
      } else {
         // streamData = setInterval(() => {
         //    console.log(id+1)
         //    let ndata = chartData;
         //    ndata.shift();
         //    ndata.push([
         //       Math.floor(Math.random() * 3) + 1683808641278,
         //       Math.floor(Math.random() * 3) * 6731.638
         //    ]);
         //    setChartData(chartData)
         // }, 200);
      }
      setIsStream(s => (!s));
   }

   return (
      <div style={{ height: '700px' }}>
         {/* <TestAja />
         <button onClick={(e) => onStreamChart(e, isStream)}>
            {isStream ? "Stop " : "Start "} Stream Chart
         </button> */}
         <AnyChart 
            instance={chart} 
            id="index-container" 
            title="TEST Data" 
         />
      </div>
   )
})

let streamData;
const TestAja = memo(() => {
   const [chartData, setChartData] = useState(get_index_stream_data());
   const [isStream, setIsStream] = useState(false);

   const onStreamChart = (e, val) => {
      e.preventDefault()
      let id = 0;
      if(val){
         clearInterval(streamData);
      } else {
         streamData = setInterval(() => {
            console.log("a")
            let ndata = chartData;
            // ndata.shift();
            ndata.push([
               Math.floor(Math.random() * 3) + 1683808641278,
               Math.floor(Math.random() * 3) * 6731.638
            ]);
            setChartData(ndata)
         }, 1000);
      }
      setIsStream(s => (!s));
   }

   return (
      <>
         <button onClick={(e) => onStreamChart(e, isStream)}>
            {isStream ? "Stop " : "Start "} Stream Chart
         </button>
         <IndexStreamChart chartData={chartData} />
      </>
      
   )
})

export default TestAja;