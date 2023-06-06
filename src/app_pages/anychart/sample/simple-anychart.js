import React, { Component, memo, useEffect, useState } from 'react';
import anychart from 'anychart';

import AnyChart from '/node_modules/anychart-react/dist/anychart-react.min';

class SimpleAnychartWithInstance extends Component {
   render() {
      this.chart = anychart.column([3,1,2]);
      anychart.theme(anychart.themes.defaultTheme);
      this.chart.title("My Chart Title");
      this.chart.legend(true);

      return (
         <div>
            <AnyChart instance={this.chart} id="simple-anychart" />
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
