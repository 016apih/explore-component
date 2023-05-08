import React, { memo, useState } from 'react';
import Select from 'react-select';

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' },
];

const SelectComponent = memo(() => {
   const [selectedOption, setSelectedOption] = useState(null);

   return (<>
      <div>SelectComponent</div>
      <Select
         defaultValue={selectedOption}
         onChange={setSelectedOption}
         options={options}
      />
   </>)
})

export default SelectComponent;