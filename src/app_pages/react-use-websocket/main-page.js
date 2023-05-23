import React, { memo, useState, Suspense } from 'react';
import { Form } from 'react-bootstrap';

import { reactUseWebsocketList } from './index.js';

const ReactUseWebsocketPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(reactUseWebsocketList[3]);

   const componetActive = (Component) => {
      if(!(Component))
         return <h5>jangan lupa import Componentnya</h5>

      return <Component />
   }

   const display = tableActive === 3 ? "none" : "block";

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="row mx-2" /*style={{ display: "none" }}*/>
            {reactUseWebsocketList.map(d => 
               <div key={"anychart-list-menu-"+d.key} className="col-auto mb-3">
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
         <div className="row mx-0">
            { componetActive(tableActive.comp) }
         </div>
      </Suspense>
   )
});

export default ReactUseWebsocketPage;