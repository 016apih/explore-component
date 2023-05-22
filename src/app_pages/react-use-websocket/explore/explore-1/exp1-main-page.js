import React, { memo } from 'react';
import { useRef } from 'react';

import { WebsocketAction, useNetwork } from '../../context/net-context';
import Exp1Header from "./layouts/exp1-header.js";
import Exp1Footer from './layouts/exp1-footer.js';
import Exp1Sidebar from './layouts/exp1-sidebar.js';

const Exp1MainPage = memo(() => {

   const netAction = useRef(null);
   const { session_id } = useNetwork();

   const doLogout = () => {
      netAction.current?.sendAct({ action_type: "LOGOUT", session_id })
   }

   return (<>
      <WebsocketAction ref={netAction} />
      <Exp1Header />
      <Exp1Sidebar />
      <Exp1Footer />
      <div>MainPage setelah login</div>
      <button onClick={doLogout}>Logout</button>
   </>)
})

export default Exp1MainPage;