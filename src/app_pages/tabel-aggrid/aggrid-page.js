import React, { memo, useState, Suspense } from 'react';
import { Form } from 'react-bootstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { 
   agGridList,
   CheckboxWithFirstColumn,
   CheckboxWithCustomColumn,
   ColDefWithRefData,
} from './index.js';

const AgGridPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(agGridList[0]);

   const componetActive = (key) => {
      if(key === "checkbox1")
         return <CheckboxWithFirstColumn />;
      else if(key === "checkbox2")
         return <CheckboxWithCustomColumn />
      else if(key === "col-properti-1")
         return <ColDefWithRefData />
      else
         return <h5>jangan lupa import Componentnya</h5>
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="row mx-2">
            {agGridList.map(d => 
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

export default AgGridPage;