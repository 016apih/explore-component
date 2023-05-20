import React, { memo } from 'react'
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { setRupiah } from '../../../../generalFunction';

const expData = [
   {x: "Jan", value: 300, fill: "var(--secondary-success)", stroke: "var(--secondary-success)"},
   {x: "Feb", value: -200, fill: "var(--secondary-sky)", stroke: "var(--secondary-sky)"},
   {x: "Mar", value: -500, fill: "var(--secondary-sky)", stroke: "var(--secondary-sky)"},
   {x: "Apr", value: -1000, fill: "var(--secondary-sky)", stroke: "var(--secondary-sky)"},
   {x: "May", value: 100, fill: "var(--secondary-success)", stroke: "var(--secondary-success)"},
   {x: "Jun", value: 200, fill: "var(--secondary-success)", stroke: "var(--secondary-success)"},
   {x: "Jul", value: 400, fill: "var(--secondary-success)", stroke: "var(--secondary-success)"},
   {x: "Aug", value: 600, fill: "var(--secondary-success)", stroke: "var(--secondary-success)"},
];

const ProfitAndLossChart = memo(({ chartData }) => {

   var chart = anychart.column();

   chart.column(expData); 

   // create grid, x-axis: false, y-axis
   chart.yGrid().enabled(true); 
   chart.yGrid().stroke({ color: "var(--netral-grey-ash)"});
   chart.xMinorGrid().enabled(false);

   chart.label().enabled(false);

   // column tootltip
   const columnTooltip = chart.tooltip();
   columnTooltip.format((e) => `value: ${setRupiah(e.value)}`);

   // set the title
   var title = chart.title();
   title.enabled(true);
   title.orientation("bottom");
   title.align("center");
   title.fontSize(12);
   title.fontWeight("bold");
   title.useHtml(true);
   title.text(
      `<span style="color:var(--secondary-sky);">Negative Liquidity</span>&nbsp;&nbsp;` +
      `<span style="color:var(--secondary-success);">Positive Liquidity</span>`
   );

   // legend 
   chart.legend(false);
   
   return (<>
      <AnyChart 
         instance={chart} 
         height={200}
         id="profit-loss-chart"
      />
   </>)
})

export default ProfitAndLossChart;