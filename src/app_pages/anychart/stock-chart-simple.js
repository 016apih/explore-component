import React, { memo } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { get_msft_daily_short_data,
   get_orcl_daily_short_data,
   get_csco_daily_short_data,
   get_ibm_daily_short_data,
} from './data';

var chart = anychart.stock();

var msftDataTable = anychart.data.table();
msftDataTable.addData(get_msft_daily_short_data());
var firstPlot = chart.plot(0);
firstPlot.area(msftDataTable.mapAs({'value': 4})).name('MSFT');

var orclDataTable = anychart.data.table();
orclDataTable.addData(get_orcl_daily_short_data());
var secondPlot = chart.plot(1);
secondPlot.splineArea(orclDataTable.mapAs({'value': 4})).fill('#1976d2 0.65').stroke('1.5 #1976d2').name('ORCL');

var cscoDataTable = anychart.data.table();
cscoDataTable.addData(get_csco_daily_short_data());
var thirdPlot = chart.plot(2);
thirdPlot.stepArea(cscoDataTable.mapAs({'value': 4})).fill('#ef6c00 0.65').stroke('1.5 #ef6c00').name('CSCO');

var ibmDataTable = anychart.data.table();
ibmDataTable.addData(get_ibm_daily_short_data());

var forthPlot = chart.plot(3);
forthPlot.line(msftDataTable.mapAs({'value': 4})).name('MSFT').tooltip(null);
forthPlot.spline(orclDataTable.mapAs({'value': 4})).name('ORCL').tooltip(null);
forthPlot.stepLine(cscoDataTable.mapAs({'value': 4})).name('CSCO').tooltip(null);

chart.scroller().area(msftDataTable.mapAs({'value': 4}));
chart.selectRange('2005-01-03', '2005-11-20');

const StockChartSample = memo(() => {
   return (
      <AnyChart
         width={800}
         height={600}
         instance={chart}
         title="Stock demo"
      />
   )
})

export default StockChartSample;