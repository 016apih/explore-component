import React, { Component, memo, useEffect, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

class SimpleAnychartWithInstance extends Component {
   render() {
      let stage = anychart.graphics.create("simple-anychart");
      let chart = anychart.column([3,1,2]);
      chart.title("My Chart Title");
      chart.legend(true);
      chart.container(stage)
      chart.draw();

      return (
         <div>
            <AnyChart instance={chart} id="simple-anychart" />
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
export { SimpleAnychartWithInstance };
