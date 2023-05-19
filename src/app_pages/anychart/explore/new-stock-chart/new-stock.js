import React, { memo, useState } from 'react';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';

import { SelectComponent } from '../../../../app_components';
import { chartIcon, tradViewIcon, arrowInIcon } from '../../../../assets/icons';

import NewStockChart from './new-stock-chart';
import { get_stock_code, get_stock_chart } from '../../data';

const NewStockInfo = memo(({ chartSeries, setChartSeries, rangeChart, setRangeChart }) => {
   return (<>
      <div className="row" style={{ padding: "10px 10px 0px 10px" }}>
         <div className="col-md-6">
            <table>
               <thead></thead>
               <tbody>
                  <tr>
                     <td className="">Open : <span className="text-danger">7081</span></td>
                     <td className="px-3">High : <span className="text-success">7081</span></td>
                     <td className="px-3">Chg : <span className="text-success">7081</span></td>
                     <td className="px-3">Val : <span className="text-success">7081</span></td>
                  </tr>
                  <tr>
                     <td className="">Lot : <span className="text-success">7081</span></td>
                     <td className="px-3">Low : <span className="text-danger">7081</span></td>
                     <td className="px-3">Prev : <span className="text-danger">7081</span></td>
                     <td className="px-3">Freq : <span className="text-danger">7081</span></td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div className="col-md-4 align-self-center">
            {/* <div id="rangeselectorContainer"></div> */}
            <div id="rangepickerContainer"></div>
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
                     { key: "1y", title: '1y', type: "Unit", unit: "year", count: 1 },
                     { key: "max", title: 'All', type: "Max", unit: "", count: 1 },
                  ].map(d => (
                     <div key={"rpc-anychart-" + d.key} 
                        className="col-auto px-4 ms-auto container-icon-chart"
                        style={{ 
                           background: rangeChart.key === d.key ? "white" : "",
                           cursor: 'pointer'
                        }}
                        onClick={() => setRangeChart(d)}
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
                  onClick={() => setChartSeries("splineArea")}
               >
                  {chartIcon('var(--netral-grey)')}
               </div>
               <div className={`d-inline ${chartSeries === "candlestick" && "bg-white"}`} 
                  style={{ padding: '2px', borderRadius: '4px', cursor: "pointer"}}
                  onClick={() => setChartSeries("candlestick")}
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

const NewStock = memo(() => {
   const [codeList, setCodeList] = useState(get_stock_code());
   const [code, setCode] = useState(null);
   const [chartData, setChartData] = useState([]);
   const [chartSeries, setChartSeries] = useState('splineArea'); // "candlestick",
   const [rangeChart, setRangeChart] = useState({key: "max",type: "Max"});

   const onSelectCode = (e) => {
      setCode(e);
      setChartData(get_stock_chart(e.value));
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
               chartSeries={chartSeries} setChartSeries={setChartSeries} 
               rangeChart={rangeChart} setRangeChart={setRangeChart}
            />
            <NewStockChart 
               chartData={chartData}
               chartCode={code}
               chartSeries={chartSeries}
               rangeChart={rangeChart}
            />
         </div>
      </div>
   </>)
})

export default NewStock