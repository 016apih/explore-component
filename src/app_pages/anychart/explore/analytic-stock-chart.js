import React, { memo, useCallback, useEffect, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_analytic_stock_chart } from '../data';
import { chartThemeList, annotationList, seriesTypeList, indicatorList } from './variabel-chart';
import { Modal } from 'bootstrap';
import { indicators } from '../../../assets/anychart'
import ModalIndex from './modal';

// default constanta chart
const defData = get_analytic_stock_chart(); // []; // array of array
const defCode = [{saham: "Series"}];  // array of object
const defTheme = "coffee"; // "defaultTheme";
const defAnnotation = "default";
const defSeries = "candlestick";
const defIndicator = "";

const AnalyticStockChart = memo(() => {
   const [id, setId] = useState(1);
   const [arrData, setArrData] = useState(defData);
   const [firstdate, setFirstdate] = useState("");
   const [lastdate, setLastdate] = useState("");

   const [chartTheme, setCharTheme] = useState(defTheme);
   const [annotation, setAnnotation] = useState(defAnnotation);
   const [seriesType, setSeriesType] = useState(defSeries);
   const [indicatorChart, setIndicatorChart] = useState(defIndicator);
   const [modalIndcator, setModalIndicator] = useState({});
   
   const chart = anychart.stock();
   anychart.theme(chartTheme);
   
   // set chart padding, background
   chart.padding().right(60);
   chart.background().fill("none");
   
   if(chartTheme === "lightGlamour"){
      let backgroundTooltip = chart.tooltip().background().enabled(true);;
      backgroundTooltip.fill("#3C3C3C 0.8");
   }

   // create plot on the chart
   const plot = chart.plot(0);
   const chartData = anychart.data.table();

   // enabled x-grid/y-grid
   plot.yGrid().enabled(true);
   plot.yGrid().stroke({color: "#555555", dash: "3 4"});
   plot.xMinorGrid().enabled(true);
   plot.xMinorGrid().stroke({color: "#555555", dash: "2 4"});

   // set orientation y-axis to the right side
   plot.yAxis().orientation('right');

   // set annotation in plot (chart 1)
   const controller = plot.annotations();

   // create candlestick series on the plot
   let mapData = chartData.mapAs({ x: 0, 'open': 1, 'high': 2, 'low': 3, 'close': 4, 'value': 3, });
   const aaplSeries = plot[seriesType](mapData);
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

   chart.scroller().line(mapVolume); // scroller with data volume

   // set chart selected date/time range
   chart.selectRange(firstdate, lastdate);

   // create range picker
   let rangePicker = anychart.ui.rangePicker();
   rangePicker.render(chart); 

   // create range selector
   let rangeSelector = anychart.ui.rangeSelector(); 
   rangeSelector.render(chart);
   
   chartData.addData(arrData);
   aaplSeries.seriesType(seriesType);

   useEffect(() => {
      // set annotation
      if(annotation === "default"){
         controller.removeAllAnnotations();
      } else {
         controller.startDrawing(annotation);
      }

      // set indicator
      if(modalIndcator.indicator){
         const plot = chart.plot(modalIndcator.indicator.plotIndex);
         let settings = [mapData];
         for (let key in modalIndcator.indicator) {
            if (key !== 'overview' && key !== 'plotIndex') {
               let val = modalIndcator.indicator[key];
               val = val == 'true' || val == 'false' ? val == 'true' : val;
               settings.push(val);
            }
         }
         if(indicatorChart === "psar"){
            let { accelerationFactorMaximum, accelerationFactorStart, accelerationFactorincrement } = modalIndcator.indicator;
            let indicator = plot.psar(mapData, accelerationFactorStart, accelerationFactorincrement, accelerationFactorMaximum).series();
            indicator.fill("#2bccf3");
            indicator.stroke("#2bccf3");

            // set indicator settings
            indicator.type('circle').size(1);
            // adding extra Y axis to the right side
            plot.yAxis(1).orientation('right');
         } else if(indicatorChart == "sma"){
            let { period_1, period_2, period_3 } = modalIndcator.indicator;
            let sma20 = plot.sma(mapData, period_1).series();
            sma20.name(`SMA(${period_1})`).stroke('#6745bf');

            // create SMA indicator with period 20
            let sma50 = plot.sma(mapData, period_2).series();
            sma50.name(`SMA(${period_2})`).stroke('#bf549b');

            let sma60 = plot.sma(mapData, period_3).series();
            sma60.name(`SMA(${period_3})`).stroke('#6cb8c2');
         } else {
            plot[indicatorChart].apply(plot, settings);
            // adding extra Y axis to the right side
            plot.yAxis(1).orientation('right');
         }
      }

   },[ arrData, annotation, modalIndcator ]);

   const setChartData = () => {
      let nid = (id % 2) + 1;
      let ndata = get_analytic_stock_chart(nid)
      setArrData(ndata);
      setId(id + 1);
      setFirstdate(ndata[0][0]);
      setLastdate(ndata[ndata.length - 1][0]);
   }

   const onSelectTheme = useCallback((val) => {
      setCharTheme(val);
      anychart.theme(val);
   }, [chartTheme])
   
   const onSelectAnnotation = (val) => {
      setAnnotation(val);
   };

   const onSelectSeriesType = useCallback((val) => {
      aaplSeries.seriesType(val);
      setSeriesType(val);
   }, [seriesType])

   const onSelectIndicator = (val) => {
      setIndicatorChart(val);
      if(val !== ""){
         setModalIndicator(s => ({ ...s,
            show: true, 
            setModalIndicator,
            tempIndicator: indicators[val]
         }));
      }
   }

   const onResetData = () => {
      setCharTheme(defTheme);
      setAnnotation(defAnnotation);
      setIndicatorChart(defIndicator);
      setModalIndicator({});
      plot.annotations().removeAllAnnotations();
   }

   return (<>
      <div className="row">
         <div className="col-auto">
            <button onClick={setChartData}>Set Chart Data</button>
         </div>
         <div className="col-auto">
            <select placeholder="Theme" 
               onChange={(e) => onSelectTheme(e.target.value)}
               value={chartTheme}
            >
               { chartThemeList.map((d, id) => (
                  <option key={"cht2-theme"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto">
            <select placeholder="Annotation" 
               onChange={(e) => onSelectAnnotation(e.target.value)}
               value={annotation}
            >
               { annotationList.map((d, id) => (
                  <option key={"cht-anntion"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto">
            <select placeholder="Annotation" 
               onChange={(e) => onSelectSeriesType(e.target.value)}
               value={seriesType}
            >
               { seriesTypeList.map((d, id) => (
                  <option key={"cht-series-type"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto">
            <ModalIndex { ...modalIndcator } />
            <select placeholder="Annotation" 
               onChange={(e) => onSelectIndicator(e.target.value)}
               value={indicatorChart}
            >
               { indicatorList.map((d, id) => (
                  <option key={"cht-series-type"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto">
            <button onClick={onResetData}>Reset Data</button>
         </div>
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