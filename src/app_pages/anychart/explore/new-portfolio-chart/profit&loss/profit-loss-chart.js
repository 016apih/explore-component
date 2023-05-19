import React, { memo } from 'react'
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

const expData = [
   -3, -7, 5, 8, 3, 2,0,-3
   // ["Negative Liquidity", -3, -7, -3],
   // ["Negative Liquidity", -7],
   // ["Positive Liquidity", 5],
   // ["Positive Liquidity", 8],
   // ["Positive Liquidity", 3],
   // ["Positive Liquidity", 5, 8, 3, 2, 0,],
   // ["Negative Liquidity", -3],
];

const ProfitAndLossChart = memo(({ chartData }) => {

   const chart = anychart.column(expData);

   // create grid, x-axis: false, y-axis
   chart.yGrid().enabled(true); 
   chart.yGrid().stroke({ color: "var(--netral-grey-ash)"});
   chart.xMinorGrid().enabled(false);

   // chart.fill("red", 0.3);
   // chart.fallingFill('red', 0.5)
   chart.label().enabled(false);
   // chart.title().enable(false);
   chart.legend(true);
   
   return (<>
      <AnyChart 
         instance={chart} 
         height={200}
         id="profit-loss-chart"
      />
   </>)
})

export default ProfitAndLossChart;