import React, { memo } from 'react';
import anychart from 'anychart';
import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

import { get_index_stream_data } from './data';

let chart = anychart.stock();
let indexchart = anychart.data.table();
indexchart.addData(get_index_stream_data());

let mapData = indexchart.mapAs({x: 0, value: 1}); // x: time, value: price
let seriesRaw = chart.plot(0);

// create grid
seriesRaw.yGrid().enabled(true); // set grid (kotak-kotak)
seriesRaw.yGrid().stroke({ color: "#555555", dash: "3 4"}); // dash: "ketebalan kerapatan"
seriesRaw.xMinorGrid().enabled(true);
seriesRaw.xMinorGrid().stroke({ color: "#555555", dash: "2 4"})

let series = seriesRaw.line(mapData); // create jenis chart
series.stroke("#64B5F6"); // color raw
series.name("Price");

chart.tooltip().titleFormat('{%x}{type:time}'); // set format tooltip default 11 May 2023, 13:05:30 jadi13:05:30
let columnTooltip = series.tooltip();
columnTooltip.format(`{%seriesName}: {%value}`); // set format tooltip di bawah title
columnTooltip.displayMode("single");

chart.crosshair().xLabel().format(' ');

chart.plot(0).legend(true);

let title =  chart.plot(0).legend().title();
title.useHtml(true);
// enable legend title
title.enabled(true);
title.text("&nbsp;");
// set Font size & align
title.fontSize(14);
title.hAlign("center");

chart.scroller(true);
chart.scroller().enabled(false);
chart.container('container').draw();

const IndexStreamChart = memo(() => {
   return (
      <AnyChart 
         instance={chart} 
         id="container" 
         title="TEST Data" 
         height={600}
      />
   )
})

export default IndexStreamChart;