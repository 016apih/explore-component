import React, { memo, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { seriesTypeIndicator } from '../variabel-chart';

function getInputLabelText(keyText) {
   var text = '';
   var result = [];

   keyText.split(/(?=[A-Z])/).filter(function (item) {
      if (item.length === 1) {
         text += item;
      } else {
         text += ' ';
         text += item;
      }
   });
   text = text.trim();
   text = text[0].toUpperCase() + text.substr(1);

   text.split(' ').filter(function (item, index) {
      if (item.length === 1 && index !== text.split(' ').length - 1) {
         result.push(item + '-');
      } else {
         result.push(item);
      }
   });

   return result.join(' ').replace(/-\s/, '-');
}

const ModalIndex = memo(( props ) => {
   let { show=false, tempIndicator={}, setModalIndicator } = props;

   const handleClose = () => {
      setModalIndicator({ show: false });
   };

   const handleSave = () => {
      setModalIndicator(s => ({ ...s, show: false, isActive: true,}) );
   }

   const setColClass= (id, rowCount=12, colmCount=3) => {
      let leng = Object.keys(tempIndicator).length - 2
      let mod = leng % colmCount;
      if(id >= (leng - mod)){
         return `col-sm-${rowCount/mod}`
      }
      return `col-sm-${rowCount/colmCount}`;
   }

   const onChangeInput = (e) => {
      let { name, value } = e.target;
      let newVal = typeof(tempIndicator[name]) === "number" ? value * 1 : value;
      setModalIndicator({ ...props, 
         tempIndicator: { ...tempIndicator, [name]: newVal } 
      });
   }

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>
               {tempIndicator?.overview?.title}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="row">
               { Object.keys(tempIndicator).map((d, id) => (d != "plotIndex" && d != "overview") && (
                  <div key={"inpt-idc-" + id} className={setColClass(id)}>
                     <div className="form-group" id="indicatorFormGroup">
                        <label htmlFor={d} className="control-label">
                           {getInputLabelText(d)}
                        </label>
                        { typeof(tempIndicator[d]) === "number" ?
                              <input type="number"
                                 name={d} id={d}
                                 className="form-control form-control-sm"
                                 value={tempIndicator[d]}
                                 onChange={onChangeInput}
                              />
                           : <select className="form-control form-control-sm select show-tick" 
                                 name={d} id={d} defaultValue={tempIndicator[d]}
                                 value={tempIndicator[d]}
                                 onChange={onChangeInput}
                                 multiple={false}
                              >
                                 {(typeof(tempIndicator[d]) === "string" ? seriesTypeIndicator : tempIndicator[d]).map((dd, key) => (
                                    <option key={"opt-idc-s-"+key} value={dd.toLocaleLowerCase()}>
                                       {getInputLabelText(dd)}
                                    </option>
                                 ))}
                              </select>
                        }
                     </div>
                  </div>
               )) }

               <div className="col-sm-12 mt-2">
                  {tempIndicator?.overview?.description}
               </div>
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
               Save Changes
            </Button>
         </Modal.Footer>
      </Modal> 
   )
});

export default ModalIndex;