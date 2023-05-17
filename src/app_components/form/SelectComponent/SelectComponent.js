import React, { memo } from 'react';
import Select from 'react-select';

import { customFilter } from './customFilter.js';
import { customStyles } from './customeStyle.js';
import { customTheme } from './customTheme.js'

const SelectComponent = memo(({
   maxMenuHeight=155,
   isSearchable=true,
   placeholder="Search...",
   options=[], // [{ value, code, name, label,}]
   onChange=null,
   className="",
   value=null,
   thememode=false 
}) => {
   return (
      <Select
         filterOption={customFilter} 
         isSearchable={isSearchable}
         maxMenuHeight={maxMenuHeight} 
         styles={customStyles} 
         placeholder={placeholder} 
         options={options}
         onChange={(e) => onChange(e)}
         className={className} 
         theme={(theme) => customTheme(theme, thememode)}
         value={value}
      />
   )
})

export default SelectComponent;