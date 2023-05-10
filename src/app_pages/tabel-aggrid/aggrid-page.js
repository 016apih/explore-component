import React, { memo, useState, Suspense } from 'react';
import { Form } from 'react-bootstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { 
   CheckboxWithFirstColumn,
   CheckboxWithCustomColumn
} from './index.js'
// const { CheckboxWithFirstColumn} = React.lazy(() => import('./index.js'));

const agGridList = [
   { key: "checkbox1", name: "CheckboxWithFirstColumn", label: "Checkbox 1" },
   { key: "checkbox2", name: "CheckboxWithCustomeColumn", label: "Checkbox 1" },
]

const AgGridPage = memo(() => {
   const [ tableActive, setTableActive ] = useState(agGridList[0])
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
            {tableActive.key === "checkbox1" ? 
               <CheckboxWithFirstColumn />
            : tableActive.key === "checkbox2" ?
               <CheckboxWithCustomColumn />
            : 
               ""

            }
         </div>
      </Suspense>
   )
});

export default AgGridPage;