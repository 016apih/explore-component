import React from 'react';
import { AgGridReact } from 'ag-grid-react';

class CheckboxWithCustomColumn extends React.PureComponent {
   constructor(props) {
      super(props);   
      this.state = {
         columnDefs: [
            { field: 'athlete', 
               minWidth: 180,
               headerCheckboxSelection: true,  //* setHeaderCheckbox
               checkboxSelection: true, //* boolean || () => boolean
               showDisabledCheckboxes: true, //* menampilkan kotak checbox disabled
            },
            { field: 'age' },
            { field: 'country', minWidth: 150 },
         ],
         defaultColDef: {
            flex: 1,
            minWidth: 100,
            resizable: true
         },
         rowSelection: 'multiple',
         rowData: null,
      };
   }

   onGridReady = (params) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // set data from api with setRowData
      const updateData = (data) => {
         let ndata = data.slice(0, 6).map((d, id) => ({ ...d, 
            status: (id % 2 === 0 ? true : false)} 
         ));
         params.api.setRowData(ndata);
      }

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
         .then((resp) => resp.json())
         .then((data) => updateData(data));
   };

   // setSelected Checkbox in first render
   onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
      params.api.forEachNode((node) => {
         // set selected with condition
         node.setSelected(!!node.data && node.data.status)
      });
   }

   // onchange checkbox
   onRowSelected = (e) => {
      if(e.node.selected){ // atau bisa pakai e.node.isSelected()
         this.setState(s => ({ ...s, lastSelected: e.data.athlete}) )
      } else {
         this.setState(s => ({ ...s, lastUnSelected: e.data.athlete}) )
      }
      const selectedRows = this.gridApi.getSelectedRows(); 
   
      this.setState(s => ({ ...s, 
         resRowSelected: selectedRows.map(d => d.athlete).toString() 
      }) );
   }

   render() {
      let { columnDefs, defaultColDef, rowSelection, rowData, resRowSelected, lastSelected, lastUnSelected } = this.state;
      return (<>
         <div>
            Row Selected: {resRowSelected } <br/>
            lastSelected: {lastSelected} || lastUnSelected: {lastUnSelected}
         </div>
         <div className="ag-theme-alpine" 
            style={{width: 900, height: 500}} // wajib ada supaya muncul
         >
            <AgGridReact
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
               suppressRowClickSelection={true} // disbaled onSelectionChanged
               rowSelection={rowSelection}
               onRowSelected={this.onRowSelected.bind(this)} // onChange checkbox
               onGridReady={this.onGridReady}
               rowData={rowData}
            />
         </div>
      </>)
   }
}

export default CheckboxWithCustomColumn;