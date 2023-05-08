import React, { memo } from 'react';
import { Card } from 'react-bootstrap';

import { SelectComponent } from '../app_components';

const MainPage = memo(() => {
   return (<>
      <div className="w-50 m-3">
         <SelectComponent />
      </div>
      <div className="row mx-2">
         <div className="col-md-4">
            <Card>
               <Card.Body>
                  <Card.Title>Form</Card.Title>
                  <Card.Text>
                     <SelectComponent />
                  </Card.Text>
               </Card.Body>
            </Card>
         </div>
         <div className="col-md-4">
            <div className="card">
               <h5 className="card-title px-3 pt-3 text-end text-decoration-underline">
                  Modal
               </h5>
               <div className="card-body">
                  <SelectComponent />
               </div>
            </div>
         </div>

      </div>
   </>)
});

export default MainPage;