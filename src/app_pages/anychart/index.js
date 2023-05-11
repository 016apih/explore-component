export { default as AnyChartPage } from './anychart-page.js';
export { default as SimpleAnychart, SimpleAnychartWithInstance, SimpleAnyChartWithHooks } from './simple-anychart.js';
export { default as SimpleDasboard } from './simple-dasboard.js';
export { default as StockChartSample } from './stock-chart-simple.js'
export { default as IndexStreamChart } from './index-stream-chart.js'

export const anyChartList = [
   { 
      key: "simple", 
      // comp: Pages('./checkbox-with-first-column.js'),
      name: "SimpleAnychart"
   },{ 
      key: "simple-dasboard",
      name: "SimpleDasboard"
   },
   {  key: "simple-stock-chart", name: "StockChartSample" },
   {  key: "index-stream-chart", name: "IndexStreamChart" },
]

