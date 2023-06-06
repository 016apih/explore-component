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
   indicatorValue: "",
   indicatorName: ""
}

const RelativePerformance = memo((props) => {
   const [code1, setCode1] = useState(null);
   const [code2, setCode2] = useState(null);
   const [codeList, setCodeList] = useState([]);

   const [settingChart, setSettingChart] = useState(defSettingChart);
   const [modalIndcator, setModalIndicator] = useState({ show: false });

   useEffect(() => {
      setCodeList([ ...get_stock_code(), ...get_index_code() ]);
   }, [])

   useEffect(() => {
      if(modalIndcator?.isActive === true){
         setSettingChart(s => ({ ...s, 
            indicatorName: modalIndcator?.indicatorName,
            indicatorValue: modalIndcator.tempIndicator,
            annotation: "default",
         }) );
         setModalIndicator({ show: false })
      }
   }, [ modalIndcator?.isActive ]);

   const onSelectAnnotation = (annotation) => {
      setSettingChart(s => ({ ...s, annotation }) );
   };

   const onSelectIndicator = (val) => {
      if(val !== ""){
         setModalIndicator(s => ({ ...s,
            show: true, 
            setModalIndicator,
            tempIndicator: indicators[val],
            indicatorName: val
         }));
      } else {
         setSettingChart(s => ({ ...s, indicatorName: "", indicatorValue: "" }) );
      }
   }

   const onSelectTheme = (chartTheme) => {
      setSettingChart(s => ({ ...s, chartTheme, annotation: "default" }) );
   }

   const onShowGraph = () => {
      if(code1 === null || code2 === null){
         alert('Mohon isi dulu kedua pilihan');
      } else {
         let data1 = code1.type === "index" ? get_index_chart(code1.code) : get_stock_chart(code1.code)
         let data2 = code2.type === "index" ? get_index_chart(code2.code) : get_stock_chart(code2.code)
         setSettingChart(s => ({ ...s, 
            chartCode: [code1.code, code2.code],
            chartData: [data1, data2] 
         }) );
      }
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
               multiple={false}
               disabled={code1 === null || code2 === null}
            >
               { annotationList.map((d, id) => (
                  <option key={"cht-anntion-rp-"+id} value={d.value}>
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
               value={settingChart?.indicatorName}
               multiple={false}
               disabled={code1 === null || code2 === null}
            >
               { indicatorList.map((d, id) => (
                  <option key={"cht-series-type-rp-"+id} value={d.value}>
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
               multiple={false}
               disabled={code1 === null || code2 === null}
            >
               { chartThemeList.map((d, id) => (
                  <option key={"cht2-theme-rp-"+id} value={d.value}>
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
         <RelativePerformanceChart { ...settingChart } />
      </div>
   </>)
})

export default RelativePerformance;