import React, { memo, useEffect, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

const RelativePerformanceChart = memo((props) => {

   let { chartData, chartTheme, chartCode, annotation, indicatorChart } = props;

   const chart = anychart.stock();
   anychart.theme(chartTheme);
   
   // setting chart padding to fit both Y axes
   chart.padding(10, 50, 20, 50);

   // create plot on the chart
   const plot = chart.plot(0);
   plot.yScale().comparisonMode('percent');
   plot.yScale({'scale': 'linear', 'indicators': {}});

   plot.yAxis().labels().format('{%Value}%');
   // set orientation y-axis to the right side
   // plot.yAxis().orientation('right');

   plot.yGrid(true).yMinorGrid(true);
   plot.yGrid().enabled(true); // enabled x-grid/y-grid
   plot.yGrid().stroke({color: "#555555", dash: "2 1"});
   plot.xMinorGrid().enabled(true);
   plot.xMinorGrid().stroke({color: "#555555", dash: "2 1"});

   // set annotation in plot (chart 1)
   const controller = plot.annotations();

   // set fill color
   const fillColor = { 
      0: '#ff0000', 1: '#ffbf00', 2: '#00d8ff', 3: '#0000FF', 4: '#008080', 
      5: '#FF0000', 6: '#808000', 7: '#20B2AA', 8: '#8A2BE2', 9: '#FF00FF'
   }

   // create dataset
   let datasetObj = {}, mapObj={}, chartObj={};
   chartData.map((d, key) => {
      datasetObj = { ...datasetObj, [`tab${key}`]: anychart.data.table()}
   });

   // mapping dataset by index data [NavDate, Nav, NavUnit]
   Object.keys(datasetObj).length > 0 && Object.keys(datasetObj).map((d, id) => {
      datasetObj[d].addData(chartData[id]);
      mapObj = { ...mapObj, [`mapObj${id}`]: datasetObj[d].mapAs({ 'value': 2 }) }
   })
   
   // create line series on the plot
   Object.keys(mapObj).length > 0 && Object.keys(mapObj).map((d, key) => {
      chartObj = { ...chartObj, [`chartObj${key}`]: plot['line'](mapObj[d])}
   });

   // set series
   Object.keys(chartObj).length > 0 && Object.keys(chartObj).map((d, id) => {
      let chartSeries = chartObj[d];
      let colorSeries = fillColor[id];
      let nameSeries = chartCode[id]?.toUpperCase();

      chartSeries.name(nameSeries);
      chartSeries.fill(colorSeries);
      chartSeries.stroke(`2px ${colorSeries}`);

      chartSeries.normal().fallingFill(colorSeries, 0.8);
      chartSeries.normal().fallingStroke(colorSeries, 0.8);
      chartSeries.hovered().fallingFill(colorSeries, 1);
      chartSeries.hovered().fallingStroke(colorSeries, 1);
      chartSeries.selected().fallingFill(colorSeries, 0.9);
      chartSeries.selected().fallingStroke(colorSeries,0.9);

      chartSeries.normal().risingFill(colorSeries, 0.8);
      chartSeries.normal().risingStroke(colorSeries, 0.8);
      chartSeries.hovered().risingFill(colorSeries, 1);
      chartSeries.hovered().risingStroke(colorSeries, 1);
      chartSeries.selected().risingFill(colorSeries, 0.9);
      chartSeries.selected().risingStroke(colorSeries, 0.9);
   });

   // set indicator
   if(indicatorChart != ""){
      const plot = chart.plot(indicatorChart.plotIndex);
      let settings = [mapObj?.mapObj1];
      for (let key in indicatorChart) {
         if (key !== 'overview' && key !== 'plotIndex') {
            let val = indicatorChart[key];
            val = val == 'true' || val == 'false' ? val == 'true' : val;
            settings.push(val);
         }
      }
      if(indicatorChart === "psar"){
         let { accelerationFactorMaximum, accelerationFactorStart, accelerationFactorincrement } = indicatorChart;
         let indicator = plot.psar(mapObj?.mapObj1, accelerationFactorStart, accelerationFactorincrement, accelerationFactorMaximum).series();
         indicator.fill("#2bccf3");
         indicator.stroke("#2bccf3");

         // set indicator settings
         indicator.type('circle').size(1);
         // adding extra Y axis to the right side
         plot.yAxis(1).orientation('right');
      } else if(indicatorChart == "sma"){
         let { period_1, period_2, period_3 } = indicatorChart;
         let sma20 = plot.sma(mapObj?.mapObj1, period_1).series();
         sma20.name(`SMA(${period_1})`).stroke('#6745bf');

         // create SMA indicator with period 20
         let sma50 = plot.sma(mapObj?.mapObj1, period_2).series();
         sma50.name(`SMA(${period_2})`).stroke('#bf549b');

         let sma60 = plot.sma(mapObj?.mapObj1, period_3).series();
         sma60.name(`SMA(${period_3})`).stroke('#6cb8c2');
      } else {
         plot[indicatorChart].apply(plot, settings);
         // adding extra Y axis to the right side
         plot.yAxis(1).orientation('right');
      }
   }

   // set scroll date with data1
   chart.scroller(true);
   chart.scroller().line(mapObj?.mapObj1);

   // create range picker
   const rangePicker = anychart.ui.rangePicker();
   rangePicker.render(chart);

   // create range selector
   const rangeSelector = anychart.ui.rangeSelector();
   rangeSelector.render(chart);

   useEffect(() => {
      // set annotation
      if(annotation === "default"){
         controller.removeAllAnnotations();
      } else {
         controller.startDrawing(annotation);
      }
   }, [ annotation ])

   return (<>
      <AnyChart 
         instance={chart}
         id="product-comparison-chart"
         height={500}
      />
   </>)
})

export default RelativePerformanceChart;