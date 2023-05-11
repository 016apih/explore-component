import React, { memo, useState } from 'react';

import { FormCard1 } from './form-page';
import { AgGridPage } from './tabel-aggrid';
import { AnyChartPage } from './anychart';

import { SelectComponent } from '../app_components';

const options = [
   { key: "form", value: 'form', label: 'Form' },
   { key: "agGrid", value: 'agGrid', label: 'Tabel Ag Grid' },
   { key: "anyChart", value: 'anyChart', label: 'AnyChart' },
];

const MainPage = memo(() => {
   const [ pageActive, setPageActive ] = useState(options[1]);

   const componentActive = (key) => {
      if(key === "anyChart")
         return <AnyChartPage />
      else if(key === "form")
         return <FormCard1 />
      else if(key === "agGrid")
         return <AgGridPage />
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
         componentActive(pageActive.key)
      }
   </>)
});

export default MainPage;