import React, { Component } from 'react';
import AnyChart from 'anychart-react';

class SimpleAnychart extends Component {
   render() {
      return (
         <div>
            <AnyChart type="column" data={[3, 1, 2]} title="My Chart Title" legend="true"/>
         </div>
      );
   }
}

export default SimpleAnychart;