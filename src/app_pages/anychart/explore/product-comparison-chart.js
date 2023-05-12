import React, { memo, useEffect, useState } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.min.css'; // wajib ada untuk merapihkan tampilannya

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_code_product, get_product_comparison } from '../data';

const ProductComparison = memo(() => {
   const [chartData, setChartData] = useState([[]]); // array of array
   const [chartCode, setCartCode] = useState([{saham: "Series"}]) // array of object

   const chart = anychart.stock(); 

   // set scroll date
   chart.scroller(true); 
   chart.scroller().enabled(false);

   // setting chart padding to fit both Y axes
   chart.padding(10, 50, 20, 50);

   // create plot on the chart
   const plot = chart.plot(0);
   plot.yScale().comparisonMode('percent');
   plot.yScale({'scale': 'linear', 'indicators': {}});

   plot.yAxis().labels().format('{%Value}%');
   // set orientation y-axis to the right side
   plot.yAxis().orientation('right');

   plot.yGrid(true).yMinorGrid(true);
   plot.yGrid().enabled(true); // enabled x-grid/y-grid
   plot.yGrid().stroke({color: "#555555", dash: "2 1"});
   plot.xMinorGrid().enabled(true);
   plot.xMinorGrid().stroke({color: "#555555", dash: "2 1"});

   // create range picker
   const rangePicker = anychart.ui.rangePicker();
   rangePicker.render(chart);

   // create range selector
   const rangeSelector = anychart.ui.rangeSelector();
   rangeSelector.render(chart);

   // set fill color
   const fillColor = { 
      0: '#ff0000', 1: '#ffbf00', 2: '#00d8ff', 3: '#0000FF', 4: '#008080', 
      5: '#FF0000', 6: '#808000', 7: '#20B2AA', 8: '#8A2BE2', 9: '#FF00FF'
   }

   useEffect(() => {
      // create dataset
      let datasetObj = {}, mapObj={}, chartObj={};
      chartData.map((d, key) => {
         datasetObj = { ...datasetObj, [`tab${key}`]: anychart.data.table()}
      });

      // mapping dataset [NavDate, Nav, NavUnit]
      Object.keys(datasetObj).length > 0 && Object.keys(datasetObj).map((d, id) => {
         datasetObj[d].addData(chartData[id]);
         mapObj = { ...mapObj, [`mapObj${id}`]: datasetObj[d].mapAs({ 'value': 2 }) } // map by index Data
      })
      
      // create line series on the plot
      Object.keys(mapObj).length > 0 && Object.keys(mapObj).map((d, key) => {
         chartObj = { ...chartObj, [`chartObj${key}`]: plot['line'](mapObj[d])}
      });

      // set series
      Object.keys(chartObj).length > 0 && Object.keys(chartObj).map((d, id) => {
         let chartSeries = chartObj[d];
         let colorSeries = fillColor[id];
         let nameSeries = chartCode[id]?.saham?.toUpperCase();

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
   },[ chartData ])

   const setData = () => {
      setChartData(get_product_comparison());
      setCartCode(get_code_product());
   }

   return (
      <div>
         <button onClick={setData}>Set Data</button>
         <AnyChart 
            instance={chart}
            id="product-comparison-chart"
         />
      </div>
   )
})

export default ProductComparison;