import AnalyticStockChart from './explore/analytic-stock-chart.js';
import ProductComparison from './explore/product-comparison-chart.js';
import StockChartPersistent from './explore/stock-chart.js';
import IndexStreamChart from './explore/index-stream-chart.js';

import SimpleAnychart from './sample/simple-anychart.js';
import SimpleDasboard from './sample/simple-dasboard.js';
import SimpleStream from './sample/simple-stream.js';
import StockChartSample from './sample/stock-chart-simple.js';
import RelativePerformance from './explore/relative-performance/relative-performance.js';

export { default as AnyChartPage } from './anychart-page.js';

export const anyChartList = [
   { key: "simple", name: "SimpleAnychart", comp: SimpleAnychart },
   { key: "simple-dasboard", name: "SimpleDasboard", comp: SimpleDasboard},
   {  key: "simple-stock-chart", name: "StockChartSample", comp: StockChartSample },
   {  key: "simple-stream", name: "SimpleStream", comp: SimpleStream },

   {  key: "index-stream-chart", name: "IndexStreamChart", comp: IndexStreamChart },
   {  key: "stock-chart", name: "StockChartPersistent", comp: StockChartPersistent },
   {  key: "product-comparison", name: "ProductComparison", comp: ProductComparison },
   {  key: "analytic-stock-chart", name: "AnalyticStockChart", comp: AnalyticStockChart },
   {  key: "analytic-relative", name: "RelativePerformance", comp: RelativePerformance },

]

