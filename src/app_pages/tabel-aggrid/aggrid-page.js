import React, { memo } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import CheckboxWithFirstColumn from './checkbox-with-first-column';

const AgGridPage = memo(() => {
   return (
   <div className="row mx-2">
      <div>AgGridPage</div>
      <CheckboxWithFirstColumn />
   </div>
   )
});

export default AgGridPage;