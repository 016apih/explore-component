import React, { memo, useState, Suspense } from 'react';

import { reactUseWebsocketList, defTableActive } from './index.js';
import { FormChecked } from '../../app_components';

const ReactUseWebsocketPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(defTableActive);

   const componetActive = (Component) => {
      if(!(Component))
         return <h5>jangan lupa import Componentnya</h5>

      return <Component />
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="row mx-2" /*style={{ display: "none" }}*/>
            {reactUseWebsocketList.map(d => 
               <FormChecked 
                  key={"react-use-websocket-list-menu-" + d.key}
                  opt={d}
                  selected={tableActive} 
                  onChange={setTableActive} 
               />
            )}
         </div>
         <div className="row mx-0">
            { componetActive(tableActive.comp) }
         </div>
      </Suspense>
   )
});

export default ReactUseWebsocketPage;