import React, { memo, useState, Suspense } from 'react';

import { reactContextList } from './index.js';
import { FormChecked } from '../../app_components';

const ReactContextPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(reactContextList[0]);

   const componetActive = (Component) => {
      if(!(Component))
         return <h5>jangan lupa import Componentnya</h5>

      return <Component />
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="row mx-2" /*style={{ display: "none" }}*/>
            {reactContextList.map(d => (
               <FormChecked 
                  opt={d}
                  selected={tableActive} 
                  onChange={setTableActive} 
               />
            ) )}
         </div>
         <div className="row mx-0">
            { componetActive(tableActive.comp) }
         </div>
      </Suspense>
   )
});

export default ReactContextPage;