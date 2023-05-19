import React, { memo, useState } from 'react';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';

import { SelectComponent } from '../../../../app_components';
import { chartIcon, tradViewIcon, arrowInIcon } from '../../../../assets/icons';

import NewStockChart from './new-stock-chart';
import { get_stock_code, get_stock_chart } from '../../data';

/**
 * Bisa di pake untuk
 * 1. New stock chart
 * 2. new Index chart
 * 
 */

const NewStockInfo = memo(({ chartSeries, chartRange, setChartSettings }) => {

   const onChangeSeries = (chartSeries) => {
      setChartSettings(s => ({ ...s, chartSeries }) )
   }

   const onChangeRange = (chartRange) => {
      setChartSettings(s => ({ ...s, chartRange }) )
   }

   return (<>
      <div className="row" style={{ padding: "10px 10px 0px 10px" }}>
         <div className="col-md-6">
            <table>
               <thead></thead>
               <tbody>
                  <tr>
                     <td className="">
                        Open : <span className="text-danger">7081</span>
                     </td>
                     <td className="px-3">
                        High : <span className="text-success">7081</span>
                     </td>
                     <td className="px-3">
                        Chg : <span className="text-success">7081</span>
                     </td>
                     <td className="px-3">
                        Val : <span className="text-success">7081</span>
                     </td>
                  </tr>
                  <tr>
                     <td className="">
                        Lot : <span className="text-success">7081</span>
                     </td>
                     <td className="px-3">
                        Low : <span className="text-danger">7081</span>
                     </td>
                     <td className="px-3">
                        Prev : <span className="text-danger">7081</span>
                     </td>
                     <td className="px-3">
                        Freq : <span className="text-danger">7081</span>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div className="col-md-4 align-self-center">
            <div className="row" clsa style={{ 
               border: "1px solid var(--bahana-gray)", 
               borderRadius: '4px', 
               padding: '2px 4px',
               background: "var(--bahana-gray)",
               color: 'var(--primary-sky)'
            }} >
               { [
                     { key: "1d", title: '1d', type: "Unit", unit: "Day", count: 1 },
                     { key: "1w", title: '1w', type: "Unit", unit: "Day", count: 7 },
                     { key: "1m", title: '1m', type: "Unit", unit: "Month", count: 1 },
                     { key: "3m", title: '3m', type: "Unit", unit: "Month", count: 3 },
                     { key: "1y", title: '1y', type: "Unit", unit: "year", count: 1 },
                     { key: "max", title: 'All', type: "Max", unit: "", count: 1 },
                  ].map(d => (
                     <div key={"rpc-anychart-" + d.key} 
                        className="col-auto px-3 ms-auto container-icon-chart"
                        style={{ 
                           background: chartRange.key === d.key ? "white" : "",
                           cursor: 'pointer'
                        }}
                        onClick={() => d.key !== chartRange.key && onChangeRange(d)}
                     >{d.title}</div>
                  ))
               }
            </div>
         </div>
         <div className="col-md-1 align-self-center">
            <div style={{
               border: "1px solid var(--bahana-gray)", 
               borderRadius: '4px', 
               padding: '2px 4px',
               background: "var(--bahana-gray)",
               color: 'var(--netral-grey)'
            }}>
               <div className={`d-inline mr-2 ${chartSeries === "splineArea" && "bg-white"}`} 
                  style={{ padding: '2px 4px', borderRadius: '4px', cursor: "pointer"}}
                  onClick={() => onChangeSeries("splineArea")}
               >
                  {chartIcon('var(--netral-grey)')}
               </div>
               <div className={`d-inline ${chartSeries === "candlestick" && "bg-white"}`} 
                  style={{ padding: '2px', borderRadius: '4px', cursor: "pointer"}}
                  onClick={() => onChangeSeries("candlestick")}
               >
                  <CandlestickChartIcon color='info' />
               </div>
            </div>
         </div>
         <div className="col-md-1 align-self-center">
            <div style={{
               border: "1px solid var(--bahana-gray)", 
               borderRadius: '4px', 
               padding: '2px 4px',
               background: "var(--bahana-gray)",
               color: 'var(--netral-grey)'
            }}>
               <div className="d-inline" style={{ padding: '2px', background: '#E0F5FF'}}>
                  <img style={{ padding: '2px', borderRadius: '4px',  }} src={tradViewIcon} alt="React Logo" />
               </div>
               <div className="d-inline" style={{ padding: '2px', margin: '0 4px', background: "var(--bahana-gray)"}}>
                  <img style={{ padding: '2px', borderRadius: '4px',  }} src={arrowInIcon} alt="React Logo" />
               </div>
            </div>
         </div>
      </div>
   </>)
});

const defSettings = {
   chartSeries: "splineArea", // "candlestick"
   chartRange: { key: "max",type: "Max" }
}

const NewStock = memo(() => {
   const [codeList, setCodeList] = useState(get_stock_code());
   const [code, setCode] = useState(null);
   const [chartData, setChartData] = useState([]);
   const [chartSettings, setChartSettings] = useState(defSettings);

   const onSelectCode = (e) => {
      setCode(e);
      setChartData(get_stock_chart(e.value));
      setChartSettings(s => ({
         ...s, chartRange: defSettings.chartRange
      }))
   } 

   return (<>
      <div className="row">
         <div className="col-md-3">
            <SelectComponent
               options={codeList}
               onChange={onSelectCode}
               value={code}
            />
         </div>
         <div style={{ border: "1px solid red", borderRadius: "10px" }}>
            <NewStockInfo 
               { ...chartSettings }
               setChartSettings={setChartSettings}
            />
            <NewStockChart 
               chartData={chartData}
               chartCode={code}
               { ...chartSettings }
            />
         </div>
      </div>
   </>)
})

export default NewStock