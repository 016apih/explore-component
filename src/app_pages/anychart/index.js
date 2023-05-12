export { default as AnyChartPage } from './anychart-page.js';
export { default as SimpleAnychart, SimpleAnychartWithInstance } from './sample/simple-anychart.js';
export { default as SimpleDasboard } from './sample/simple-dasboard.js';
export { default as SimpleStream } from './sample/simple-stream.js';
export { default as StockChartSample } from './sample/stock-chart-simple.js'

export { default as IndexStreamChart } from './explore/index-stream-chart.js';
export { default as StockChartPersistent } from './explore/stock-chart.js'

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
   {  key: "simple-stream", name: "SimpleStream" },
   {  key: "index-stream-chart", name: "IndexStreamChart" },
   {  key: "stock-chart", name: "StockChartPersistent" },
]

