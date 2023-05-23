import React, { memo, useState } from 'react';

import { FormCard1 } from './form-page';
import { AgGridPage } from './tabel-aggrid';
import { AnyChartPage } from './anychart';
import { ReactUseWebsocketPage } from './react-use-websocket'

import { SelectComponent } from '../app_components';

const options = [
   { key: "form", value: 'form', code: "code", name: "name", label: 'Form', comps: FormCard1 },
   { key: "agGrid", value: 'agGrid', code: "code", name: "name", label: 'Tabel Ag Grid', comps: AgGridPage },
   { key: "anyChart", value: 'anyChart', code: "code", name: "name", label: 'AnyChart', comps: AnyChartPage },
   { key: "react-use-webscoket", value: 'reactUseWebsocket', code: "code", name: "name", label: 'react-use-webscoket', comps: ReactUseWebsocketPage },
];

const MainPage = memo(() => {
   const [ pageActive, setPageActive ] = useState(options[3]);

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