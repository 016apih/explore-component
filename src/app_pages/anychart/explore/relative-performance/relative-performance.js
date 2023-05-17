import React, { memo, useEffect, useState } from 'react';

import { SelectComponent } from '../../../../app_components';
import { get_index_chart, get_index_code, get_stock_chart, get_stock_code } from '../../data';

import { indicators } from '../../../../assets/anychart';
import { annotationList, chartThemeList, indicatorList } from '../variabel-chart';
import ModalIndex from '../modal';

import RelativePerformanceChart from './relative-performance-chart';

// let elemWidthIndicator = (this.props.chartMode) ? 350 : 180;
// let elemWidthanotation = (this.props.chartMode) ? 250 : 147;

// default constanta chart
const defSettingChart = {
   chartData: [],
   chartTheme: "defaultTheme",
   annotation: "default",
}
const defIndicator = "";

const RelativePerformance = memo((props) => {
   const [code1, setCode1] = useState([]);
   const [code2, setCode2] = useState([]);
   const [codeList, setCodeList] = useState([]);

   const [settingChart, setSettingChart] = useState(defSettingChart)
   const [indicatorChart, setIndicatorChart] = useState(defIndicator);
   const [modalIndcator, setModalIndicator] = useState({});

   useEffect(() => {
      setCodeList([ ...get_stock_code(), ...get_index_code() ]);
   }, [])

   const onSelectAnnotation = (annotation) => {
      setSettingChart(s => ({ ...s, annotation }) );
   };

   const onSelectIndicator = (val) => {
      setIndicatorChart(val);
      if(val !== ""){
         setModalIndicator(s => ({ ...s,
            show: true, 
            setModalIndicator,
            tempIndicator: indicators[val]
         }));
      }
   }

   const onSelectTheme = (chartTheme) => {
      setSettingChart(s => ({ ...s, chartTheme, annotation: "default" }) );
   }

   const onShowGraph = () => {
      let data1 = code1.type === "index" ? get_index_chart(code1.code) : get_stock_chart(code1.code)
      let data2 = code2.type === "index" ? get_index_chart(code2.code) : get_stock_chart(code2.code)
      setSettingChart(s => ({ ...s, 
         chartCode: [code1.code, code2.code],
         chartData: [data1, data2] 
      }) );
   }

   const onReset = () => {
      setSettingChart(s => ({ ...defSettingChart, 
         chartCode: s.chartCode,
         chartData: s.chartData
      }) )
   }

   return (<>
      <div className="row">
         <div className="col-sm-2 my-1">
            <SelectComponent
               options={codeList}
               onChange={setCode1}
               value={code1}
            />
         </div>
         <div className="col-sm-2 my-1">
            <SelectComponent
               options={codeList}
               onChange={setCode2}
               value={code2}
            />
         </div>
         <div className="col-auto my-1">
            <select 
               // data-width={elemWidthanotation} 
               data-size="10" data-dropup-auto="false" 
               data-style="btn-dark" 
               defaultValue={'default'}
               id={"typeSelect" + props.stockType} 
               className="form-select form-select-sm" 
               title="Select Annotation Type"
               onChange={(e) => onSelectAnnotation(e.target.value)}
               value={settingChart?.annotation} 
            >
               { annotationList.map((d, id) => (
                  <option key={"cht-anntion"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto my-1">
            <ModalIndex { ...modalIndcator } />
            <select placeholder="Annotation" 
               className="form-select form-select-sm" 
               onChange={(e) => onSelectIndicator(e.target.value)}
               value={indicatorChart}
            >
               { indicatorList.map((d, id) => (
                  <option key={"cht-series-type"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto my-1">
            <select placeholder="Theme" 
               className="form-select form-select-sm" 
               onChange={(e) => onSelectTheme(e.target.value)}
               value={settingChart?.chartTheme}
            >
               { chartThemeList.map((d, id) => (
                  <option key={"cht2-theme"+id} value={d.value}>
                     {d.label}
                  </option>
               )) }
            </select>
         </div>
         <div className="col-auto my-1">
            <button className="btn btn-sm btn-primary" onClick={onShowGraph}>
               Show Graph
            </button>
            <button className="btn btn-sm btn-danger" onClick={onReset}>
               Reset
            </button>
         </div>
         <RelativePerformanceChart
            { ...settingChart }
            // chartData={chartData}
            // chartTheme={chartTheme}
            // annotation={annotation}
            indicatorChart={indicatorChart}
            
         />
      </div>
   </>)
})

export default RelativePerformance;