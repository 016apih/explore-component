import React, { Component, memo, useEffect, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

const SimpleAnyChartWithHooks = memo(() => {

   return (
      <AnyChart
         width={800}
         height={600}
         // instance={chart}
         title="Stock Demo"
      />
   )
})
class SimpleAnychartWithInstance extends Component {
   render() {
      let chart = anychart.column([3,1,2]);
      chart.title("My Chart Title");
      chart.legend(true);

      return (
         <div>
            <AnyChart instance={chart} />
         </div>
      );
   }
}


class SimpleAnychart extends Component {
   render() {
      return (
         <div>
            <AnyChart 
               type="column" 
               data={[3, 1, 2]} 
               title="My Chart Title" 
               legend="true"
            />
         </div>
      );
   }
}

export default SimpleAnychart;
export { SimpleAnychartWithInstance, SimpleAnyChartWithHooks };
