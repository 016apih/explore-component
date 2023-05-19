import React, { memo, useState} from 'react';

import AssetAllocationChart from './asset-allocation-chart.js';
import ProfitAndLost from './profit&loss/profit-loss.js';

const tabMenu = [
   { id: 1, key: "asset", title: "Asset Allocation" },
   { id: 2, key: "profit-loss", title: "Profit & Loss" },
]

const tabPageMenu = [
   { id: 1, key: "investment", title: "Investment  Holdings" },
   { id: 2, key: "warrant-right", title: "Warrant/Right Issue" },
]

const NewPortfolio = memo(() => {
   const [tab, setTab] = useState(1);
   const [tabPage, setTabPage] = useState(1);

   const bgActive = (key, id) => key === id && "bg-info"

   return (<>
      <div className="row">
         <div className="col-md-5 align-self-center">
            <div className="border border-dark p-3 text-center">
               <h4>Ini halaman Portfolio</h4>
               { tabMenu.map(d => (
                  <button key={"btn-menu-port-"+d.id} className={`btn btn-sm border border-dark mx-2 ${bgActive(tab, d.id)}`}
                     onClick={() => setTab(d.id)}
                  >
                     {d.title}
                  </button>
               )) }
               <div style={{ height: "600px" }}>
                  { tab === 1 ? <AssetAllocationChart /> : <ProfitAndLost /> }
               </div>
            </div>
         </div>
         <div className="col-md-7">
            <div className="border border-dark px-2" style={{ height: '700px' }}>
               { tabPageMenu.map(d => (
                  <button key={"btn-submenu-port-"+d.id} className={`btn btn-sm border border-dark ${bgActive(tabPage, d.id)}`}
                     onClick={() => setTabPage(d.id)}
                  >
                     {d.title}
                  </button>
               )) }
               <div>
                  <button className="btn btn-sm btn-primary">
                     setData
                  </button>
               </div>
            </div>
         </div>
      </div>
   </>)
});

export default NewPortfolio;