export { default as AnyChartPage } from './anychart-page.js';
export { default as SimpleAnychart, SimpleAnychartWithInstance, SimpleAnyChartWithHooks } from './simple-anychart.js';
export { default as SimpleDasboard } from './simple-dasboard.js';
export { default as StockChartSample } from './stock-chart-simple.js'

export const anyChartList = [
   { 
      key: "simple", 
      // comp: Pages('./checkbox-with-first-column.js'),
      name: "SimpleAnychart"
   },{ 
      key: "simple-dasboard", 
      // comp: Pages('./checkbox-with-first-column.js'),
      name: "SimpleDasboard"
   },{ 
      key: "simple-stock-chart", 
      // comp: Pages('./checkbox-with-first-column.js'),
      name: "StockChartSample"
   },
]

