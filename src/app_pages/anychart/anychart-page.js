import React, { memo, useState, Suspense } from 'react';
import { Form } from 'react-bootstrap';

import { anyChartList } from './index.js';

// styles
import './styles.css';
import 'anychart/dist/css/anychart-ui.min.css'; // wajib ada untuk merapihkan tampilannya
import '../../assets/anychart';

const AnyChartPage = memo(() => {

   const [ tableActive, setTableActive ] = useState(anyChartList[0]);

   const componetActive = (Component) => {
      if(!(Component))
         return <h5>jangan lupa import Componentnya</h5>

      return <Component />
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="row mx-2">
            {anyChartList.map(d => 
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
         <div className="row mx-2">
            { componetActive(tableActive.comp) }
         </div>
      </Suspense>
   )
});

export default AnyChartPage;