import React, { memo, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

// data
let dataSet = anychart.data.table();
dataSet.addData(
   [
      {x: "P1", value: 100},
      {x: "P2", value: 200},
      {x: "P3", value: 15},
      {x: "P4", value: 130},
      {x: "P5", value: 153},
      {x: "P6", value: 120},
      {x: "P7", value: 151},
      {x: "P8", value: 58},
      {x: "P9", value: 19},
      {x: "P10", value: 135},
      {x: "P11", value: 170},
      {x: "P12", value: 195},
      {x: "P13", value: 22},
      {x: "P14", value: 175},
      {x: "P15", value: 120}
   ]
);

// set chart type
var chart = anychart.line();
chart.title().text("Click on Chart to Add a Point ");

// set data
chart.spline(dataSet).markers(null);

// disable stagger mode. Only one line for x axis labels
chart.xAxis().staggerMode(false);

// set container and draw chart
var stage = anychart.graphics.create("smp-container");
chart.container(stage);
chart.draw();

// first index for new point
let indexSetter = 15;  

var myVar;
// set interval of data stream
const setStream = () => {
   myVar = setInterval(() => {
      // append data
      dataSet.append({
         x: "P" + indexSetter,
         value : Math.floor((Math.random() * 500)+ 1) // random
      });
   
      // removes first point
      dataSet.remove(0);
      // indexSetter++;
   }, 200);
}

const SimpleStream = memo(() => {
   const [streamStatus, setStreamStatus] = useState(false);

   const onStreamStatus = () => {
      if(streamStatus){
         clearInterval(myVar);
         setStreamStatus(false);
      } else {
         setStream();
      }
   }

   return (
      <div>
         <button onClick={onStreamStatus}>
            { streamStatus ? "Start" : "Stop"} Stream
         </button>
         {/* <AnyChart 
            instance={chart} 
            id="smp-container" 
            title="TEST Data" 
            height={600}
         /> */}
      </div>
   )
})

export default SimpleStream;