import React from 'react';
import { AgGridReact } from 'ag-grid-react';

class CheckboxWithFirstColumn extends React.PureComponent {
   constructor(props) {
      super(props);
   
      this.state = {
         columnDefs: [
            { field: 'athlete', minWidth: 180 },
            { field: 'age' },
            { field: 'country', minWidth: 150 },
         ],
         defaultColDef: {
            flex: 1,
            minWidth: 100,
            resizable: true,
            headerCheckboxSelection: this.isFirstColumn, // set header column checkbox
            checkboxSelection: this.isFirstColumn, // set column checkbox
         },
         rowSelection: 'multiple',
         rowData: null,
      };
   }
   
   onGridReady = (params) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // set data from api with setRowData
      const updateRowData = (data) => {
         let ndata = data.slice(0, 6).map((d, id) => ({ ...d, 
            status: (id % 2 === 0 ? true : false),
         } ));
         this.setState(s => ({ ...s, rowData: ndata }));
         params.api.setRowData([ ...ndata, {emptyRow: ""}, {emptyRow: ""}, ]);
      }; 

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
         .then((resp) => resp.json())
         .then((data) => updateRowData(data));
   };

   // set default checkbox in first Column
   isFirstColumn(params) {
      let displayedColumns = params.columnApi.getAllDisplayedColumns();
      let thisIsFirstColumn = displayedColumns[0] === params.column;
      return thisIsFirstColumn;
   }
   
   render() {
      console.log("aaa", this.state.rowData)
      return (
         <div className="ag-theme-alpine" 
            style={{width: 900, height: 500}} // wajib ada supaya muncul
         >
            <AgGridReact
               columnDefs={this.state.columnDefs}
               defaultColDef={this.state.defaultColDef}
               suppressRowClickSelection={true} // disbaled onSelectionChanged
               rowSelection={this.state.rowSelection}
               onGridReady={this.onGridReady}
               rowData={this.state.rowData}
            ></AgGridReact>
         </div>
      )
   }
}

export default CheckboxWithFirstColumn;