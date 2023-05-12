import React, { memo, useState, Suspense } from 'react';
import { Form } from 'react-bootstrap';

import { 
   anyChartList,
   IndexStreamChart,
   ProductComparison,
   // SimpleAnychart,
   SimpleAnychartWithInstance,
   SimpleDasboard,
   // SimpleStream,
   StockChartPersistent,
   StockChartSample
} from './index.js';

// styles
import './styles.css';
import '../../assets/chartTheme/';
import 'anychart/dist/css/anychart-ui.min.css'; // wajib ada untuk merapihkan tampilannya

const AnyChartPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(anyChartList[0]);

   const componetActive = (key) => {
      if(key === "simple")
         return <SimpleAnychartWithInstance />;
      else if(key === "simple-dasboard")
         return <SimpleDasboard />
      else if(key === "simple-stock-chart")
         return <StockChartSample />
      // else if(key === "simple-stream")
      //    <SimpleStream />
      else if(key === "index-stream-chart")
         return <IndexStreamChart />
      else if(key === "stock-chart")
         return <StockChartPersistent />
      else if(key === "product-comparison")
         return <ProductComparison />
      else
         return <h5>jangan lupa import Componentnya</h5>
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="row mx-2">
            {anyChartList.map(d => 
               <div key={d.key} className="col-auto mb-3">
                  <Form.Check 
                     type="radio" 
                     id={d.key}
                     label={d.name}
                     checked={tableActive.key === d.key}
                     onChange={(e) => setTableActive(d)}
                  />
               </div>
            )}
         </div>
         <div className="row mx-2">
            { componetActive(tableActive.key) }
         </div>
      </Suspense>
   )
});

export default AnyChartPage;