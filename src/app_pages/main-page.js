import React, { memo, useState } from 'react';

import { FormCard1 } from './form-page';
import { AgGridPage } from './tabel-aggrid';
import { AnyChartPage } from './anychart';

import { SelectComponent } from '../app_components';

const options = [
   { key: "form", value: 'form', label: 'Form', comps: FormCard1 },
   { key: "agGrid", value: 'agGrid', label: 'Tabel Ag Grid', comps: AgGridPage },
   { key: "anyChart", value: 'anyChart', label: 'AnyChart', comps: AnyChartPage },
];

const MainPage = memo(() => {
   const [ pageActive, setPageActive ] = useState(options[2]);

   const componentActive = ( Component ) => {
      if(Component)
         return <Component />
      else 
         return <h5>jangan lupa import Componentnya</h5>
   }

   return (<>
      <div className="w-50 m-3">
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