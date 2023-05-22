import React, { memo } from 'react';

import { WebsocketAction, useNetwork } from '../../context/net-context';
import { useRef } from 'react';

const Exp1MainPage = memo(() => {

   const netAction = useRef(null);
   const { session_id } = useNetwork();

   const doLogout = () => {
      netAction.current?.sendAct({ action_type: "LOGOUT", session_id })
   }

   return (<>
      <WebsocketAction ref={netAction} />
      <div>MainPage setelah login</div>
      <button onClick={doLogout}>Logout</button>
   </>)
})

export default Exp1MainPage;