import React, { memo, useState } from 'react';

import { options, defaultOption } from './index.js';
import { SelectComponent } from '../app_components';

const MainPage = memo(() => {
   const [ pageActive, setPageActive ] = useState(defaultOption);

   const componentActive = ( Component ) => {
      if(!Component){
         return <h5>jangan lupa import Componentnya</h5>
      }
      return <Component />
   }

   return (<>
      <div className="w-50 m-3" /*style={{  display: "none" }}*/>
         <SelectComponent
            options={options}
            onChange={setPageActive}
            value={pageActive}
         />
      </div>
      {
         componentActive(pageActive.comps)
      }
   </>)
});

export default MainPage;