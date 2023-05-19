import React, { useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';
import { memo } from 'react';
import { setRupiah } from '../../../generalFunction';

const expData = [
   { x: "Stock", value: 11186200},
   { x: "ESBN", value: 1186200},
   { x: "Cash", value: 6186200},
   { x: "Mutual Fund", value: 183200},
   
];

const NewPortfolioChart = memo(() => {

   const onClickChart = (e) => {
      let index = e?.itemIndex || e?.point?.index;
      // console.log("onClickChart", e, index)
   }

   // create pie chart with passed data
   const chart = anychart.pie(expData);

   // set chart radius, & set value for the exploded slices
   chart.innerRadius('65%').explode(25);

   // set the explosion range in different states
   chart.selected().explode("3%");
   chart.hovered().explode("3%");

   // create standalone label and set settings
   const label = anychart.standalones.label();
   label.useHtml(true);
   label.text('<b>Rp. 40,000,000</b><br/>Your Portfolio');
   label.width('100%')
      .height('100%')
      .adjustFontSize(true, true)
      .minFontSize(10)
      .maxFontSize(25)
      .fontColor('#60727b')
      .position('center')
      .anchor('center')
      .hAlign('center')
      .vAlign('middle');

   // set label to center content of chart
   chart.center().content(label);

   // set hovered settings
   chart.hovered().fill('var(--primary-sky');

   // legend 
   chart.legend(true);
   chart.legend().useHtml(true);
   chart.legend().itemsFormat(e => {
      let point = chart.getPoint(e.index);
      let percent = point.getStat("percentValue").toFixed(1);
      return `${e.x} : <br/><b>${percent} %</b>`;
   });

   // column tootltip
   const columnTooltip = chart.tooltip();
   columnTooltip.format((e) => {
      let point = chart.getPoint(e.index);
      let percent = point.getStat("percentValue").toFixed(1);
      return `Value: ${setRupiah(e.value)}\nPercent Value: ${percent}%`;
   });
      
   // set onClick
   chart.listen("pointsSelect", onClickChart);
   chart.legend().listen("legendItemClick", onClickChart);

   return (<>
      <AnyChart 
         instance={chart} 
         height={300}
         id="analytic-stock-chart-container"
      />
   </>)
})

export default NewPortfolioChart;