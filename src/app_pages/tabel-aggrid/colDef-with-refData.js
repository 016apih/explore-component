import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const statusMappings = { true: 'Ini Yes', false: "ini No"};

class ColDefWithRefData extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         columnDefs: [ 
            { field: 'athlete', suppressCellFlash: true, enableCellChangeFlash:true }, 
            { field: 'sport' },
            { field: 'year', maxWidth: 120 },
            { field: 'status', refData: statusMappings }
         ],
         defaultColDef: {
            sortable: false,
            filter: true,
         },
         rowSelection: "multiple", 
         rowData: null,
      }
   }

   onGridReady = params => {
      this.gridApi = params.api; // create variabe in classComponent
      this.gridColumnApi = params.columnApi; // create variabe in classComponent

      // upate data dengan setRowData
      const updateRowData = (data) => {
         let ndata = data.slice(0, 6).map((d, id) => ({ ...d, 
            status: (id % 2 === 0 ? true : false),

         } ));
         this.setState(s => ({ ...s, rowData: ndata }));
         params.api.setRowData([ ...ndata, {emptyRow: ""}, {emptyRow: ""}, ]);
      }; 

      // get data
      fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
         .then((resp) => resp.json())
         .then((data) => updateRowData(data));
   };

   onRefreshSell = () => {
      this.setState(s => ({ ...s, 
         rowData: s.rowData.map(d => ({ ...d, status: !d.status }))
      }));
      this.gridApi.refreshCells({force: true, suppressFlash: true});
   }

   render() {
      return (
         <div style={{ width: "100%", height: "100%" }}>
            <button className='btn btn-sm btn-primary' onClick={this.onRefreshSell}>
               RefreshSell
            </button>
            <div className="ag-theme-alpine" 
               style={{width: 900, height: 500}} // wajib ada supaya muncul
            >
               <AgGridReact
                  columnDefs={this.state.columnDefs}
                  defaultColDef={this.state.defaultColDef}
                  rowData={this.state.rowData}
                  onGridReady={this.onGridReady}
               >
               </AgGridReact>
            </div>
            {Object.keys(statusMappings).map((d, id) => (
               <li key={"mapS"+id}>Key: {d} | value: {statusMappings[d]}</li>
            ))}
         </div>
      );
   }
}

export default ColDefWithRefData;