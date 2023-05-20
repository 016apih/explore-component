import React, { memo, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { DateInput } from '../../../../../app_components';
import ProfitAndLossChart from './profit-loss-chart';

const tabMenu = [
   {id: 0, title: "Unrealized  P/L  86.232 (0.29%)" },
   {id: 1, title: "Realized  P/L  2.440 (-1.15%)" }
]

const ProfitAndLost = memo(() => {
   const [tab, setTab] = useState(0);
   const [periode, setPeriode] = useState({});

   const onChangeDate = (key, value) => {
      if(key === "firstDate" && periode.endDate === undefined){
         // console.log('setDefault endDate')
      }
      setPeriode(s => ({ ...s, [key]: value}) )
   }

   const arrowIcon = (id) => {
      if(tab === id){
         return <KeyboardArrowDownIcon sx={{ fontSize: 30 }} /> 
      }
      return <KeyboardArrowUpIcon sx={{ fontSize: 30 }} /> 
   }

   return (<>
      <div className="py-4">
         <Accordion defaultActiveKey={tab}>
            {tabMenu.map(d => (
               <div key={"accordion-fl-"+d.id}
                  style={{ 
                     border: '1px solid var(--netral-grey-ash)',
                     borderRadius: "4px",
                     margin: "0.5rem 0"
                  }}
               >
                  <div className="text-start p-2"
                     onClick={() => setTab(tab === d.id ? -1 : d.id)}
                     style={{ cursor: "pointer" }}
                  >
                     <h5 className="d-inline">
                        {d.title}
                     </h5>
                     <span className="d-inline float-end">
                        {arrowIcon(d.id) }
                     </span>
                  </div>
                  {tab === d.id ? 
                     <div 
                        style={{ 
                           padding: '0.5rem 1.25rem',
                           borderTop: '1px solid var(--netral-grey-ash)',
                           borderRadius: "4px"
                        }}
                     >
                        <div className="row ">
                           <div className="col-sm-6">
                              <DateInput
                                 placeholder="Start Date"
                                 value={periode?.firstDate}
                                 onChange={v => onChangeDate('firstDate', v)}
                              />
                           </div>
                           <div className="col-sm-6">
                              <DateInput
                                 placeholder="End Date"
                                 value={periode?.endDate}
                                 onChange={v => onChangeDate('endDate', v)}
                              />
                           </div>
                           <div className="col-sm-12 mt-4">
                              <ProfitAndLossChart />
                           </div>
                        </div>
                     </div>
                  : <></>}
               </div>
            ))}
         </Accordion>
      </div>
   </>)
})

export default ProfitAndLost;