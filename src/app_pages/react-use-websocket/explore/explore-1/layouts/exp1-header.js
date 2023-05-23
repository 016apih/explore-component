import React, { memo, useRef } from 'react';

import './header.css';
import { WebsocketAction, useNetwork } from '../../../context/net-context';

const Exp1Header = memo(() => {
   const netAction = useRef(null);
   const { session_id } = useNetwork();

   const doLogout = () => {
      netAction.current?.sendAct({ action_type: "LOGOUT", session_id })
   }

   return (
      <header className="d-flex justify-content-center row-header">
         <WebsocketAction ref={netAction} />
         <div className="col-header">
            logo
         </div>
         <div className="main-header">
            <div className="sub-header-1 bg-blue">
               layer 1
            </div>
            <div className="sub-header-2 bg-danger">
               layer 2
            </div>
         </div>
         <div className="col-header">
            <button onClick={doLogout}>Logout</button> 
         </div>
      </header>
   )
});

export default Exp1Header