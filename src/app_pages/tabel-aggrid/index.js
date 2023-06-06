export { default as AgGridPage } from './aggrid-page.js';

export { default as CheckboxWithFirstColumn } from './checkbox-with-first-column.js';
export { default as CheckboxWithCustomColumn } from './checkbox-with-custom-column.js';
export { default as ColDefWithRefData } from './colDef-with-refData.js';

// const Pages = (path) => React.lazy(() => import(path));

export const agGridList = [
   { 
      key: "checkbox1", 
      // comp: Pages('./checkbox-with-first-column.js'),
      name: "CheckboxWithFirstColumn"
   },
   { 
      key: "checkbox2", 
      // comp: Pages('./checkbox-with-custom-column.js'),
      name: "CheckboxWithCustomeColumn", 
      label: "Checkbox 1" 
   },
   { 
      key: "col-properti-1", 
      // comp: Pages('./colDef-with-refData.js'),
      name: "ColDefWithRefData", 
      label: "Checkbox 1" 
   },
]
