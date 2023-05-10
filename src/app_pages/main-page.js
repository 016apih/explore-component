import React, { memo, useState } from 'react';

import { FormCard1 } from './form-page';
import { AgGridPage } from './tabel-aggrid';

import { SelectComponent } from '../app_components';

const options = [
   { key: "form", value: 'form', label: 'Form' },
   { key: "agGrid", value: 'agGrid', label: 'Tabel Ag Grid' },
   // { key: "", value: 'vanilla', label: 'Vanilla' },
];

const MainPage = memo(() => {
   const [ pageActive, setPageActive ] = useState(null)
   return (<>
      <div className="w-50 m-3">
         <SelectComponent
            options={options}
            onChange={setPageActive}
         />
      </div>
      {pageActive?.value === "form" ?
            <FormCard1 />
         : pageActive?.value === "agGrid" ?
            <AgGridPage />
         : ""
      }
   </>)
});

export default MainPage;