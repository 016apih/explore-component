import React, { memo } from 'react';
import { Card } from 'react-bootstrap';

import { SelectComponent } from '../../app_components';

const FormCard1 = memo(() => {
   return (
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
   )
})

export default FormCard1;