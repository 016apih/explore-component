import React, { memo } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_msft_daily_short_data,
   get_orcl_daily_short_data,
   get_csco_daily_short_data,
   get_ibm_daily_short_data,
} from '../data';


const StockChartSample = memo(() => {
   const chart = anychart.stock();

   const msftDataTable = anychart.data.table();
   msftDataTable.addData(get_msft_daily_short_data());
   const firstPlot = chart.plot(0);
   firstPlot.area(msftDataTable.mapAs({'value': 4})).name('MSFT');

   const orclDataTable = anychart.data.table();
   orclDataTable.addData(get_orcl_daily_short_data());
   const secondPlot = chart.plot(1);
   secondPlot.splineArea(orclDataTable.mapAs({'value': 4})).fill('#1976d2 0.65').stroke('1.5 #1976d2').name('ORCL');

   const cscoDataTable = anychart.data.table();
   cscoDataTable.addData(get_csco_daily_short_data());
   const thirdPlot = chart.plot(2);
   thirdPlot.stepArea(cscoDataTable.mapAs({'value': 4})).fill('#ef6c00 0.65').stroke('1.5 #ef6c00').name('CSCO');

   const ibmDataTable = anychart.data.table();
   ibmDataTable.addData(get_ibm_daily_short_data());

   const forthPlot = chart.plot(3);
   forthPlot.line(msftDataTable.mapAs({'value': 4})).name('MSFT').tooltip(null);
   forthPlot.spline(orclDataTable.mapAs({'value': 4})).name('ORCL').tooltip(null);
   forthPlot.stepLine(cscoDataTable.mapAs({'value': 4})).name('CSCO').tooltip(null);

   chart.scroller().area(msftDataTable.mapAs({'value': 4}));
   chart.selectRange('2005-01-03', '2005-11-20');

   return (
      <AnyChart
         id="simple-stock"
         width={800}
         height={600}
         instance={chart}
         title="Stock demo"
      />
   )
})

export default StockChartSample;