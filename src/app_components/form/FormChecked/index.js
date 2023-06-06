import React, { memo } from 'react';
import { Form } from 'react-bootstrap';

const Index = memo(({ key, opt, selected, onChange }) => {
   return (
      <div key={key} className="col-auto mb-3">
         <Form.Check 
            type="radio" 
            id={opt?.key}
            label={opt.name}
            checked={selected?.key === opt?.key}
            onChange={(e) => onChange(opt)}
         />
      </div>
   )
})

export default Index;