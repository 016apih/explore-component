import React, { memo } from 'react';
import Select from 'react-select';

const SelectComponent = memo(({ 
   options=[], 
   onChange=null, 
   value=null,
   ...props
}) => {
   return (<>
      <div>SelectComponent</div>
      <Select
         defaultValue={value}
         onChange={onChange}
         options={options}
         {...props}
      />
   </>)
})

export default SelectComponent;