import React, { memo, useState, Suspense } from 'react';
import { Form } from 'react-bootstrap';

import { 
   anyChartList,
   SimpleAnychart
} from './index.js';

const AnyChartPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(anyChartList[0]);

   const componetActive = (key) => {
      if(key === "simple")
         return <SimpleAnychart />;
      // else if(key === "checkbox2")
      //    return <CheckboxWithCustomColumn />
      // else if(key === "col-properti-1")
      //    return <ColDefWithRefData />
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