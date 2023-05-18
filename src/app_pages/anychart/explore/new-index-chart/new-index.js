import React, { memo, useState } from 'react'
import { SelectComponent } from '../../../../app_components';

import NewIndexChart from './new-index-chart';
import { get_index_code, get_index_chart, get_index_stream_data } from '../../data';

const NewIndex = memo(() => {
   const [codeList, setCodeList] = useState(get_index_code());
   const [code, setCode] = useState(null);
   const [chartData, setChartData] = useState([]);

   const onSelectCode = (e) => {
      setCode(e);
      setChartData(get_index_chart(e.value));
      // setChartData(get_index_stream_data(e.value));
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
         <NewIndexChart 
            chartData={chartData}
            indexCode={code}
         />
      </div>
   </>)
})

export default NewIndex