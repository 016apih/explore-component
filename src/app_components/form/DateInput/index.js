import moment from 'moment/moment';
import React, { memo, useState } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

// format value = YYY-MM-DD, format datepicker dd/MM/yyyy

const DateInput = memo(({
   value="",
   onChange = () => null,
   disabled=false,
   readOnly=false,
   placeholder="DD/MM/YYYY"

}) => {
   return (
      <DatePicker
         className="form-control form-control-sm"
         dateFormat="dd/MM/yyyy"
         disabled={disabled}
         readOnly={readOnly}
         showYearDropdown={true} // show listYear
         // isClearable={true}
         placeholderText={placeholder}
         // selected={startDate} 
         value={value}
         onChange={(e) => onChange?.(moment(e).format("YYYY-MM-DD"))} 
      />
   );
});

export default DateInput;