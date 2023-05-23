import React, { memo, useContext, useEffect } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { StoreContext, ContextConnector } from './app-fast-context';

import { url, url2 } from '../../../gitignore';

const getURL = { "": url, "Aux": url2 };

const arrField = ["socketFlag", "isConnection", "errMsg", "setVal" ];
const connectionStatus = {
   [-1]: 'Uninstantiated',
   0: 'Connecting',
   1: 'Open',
   2: 'Closing',
   3: 'Closed',
}

export const WebsocketConnection = memo(({ socketId="" }) => {
   const store = useContext(StoreContext)

   const onOpenHandler = (e) => {
      let { readyState } = e.target;
      console.log(e.target)
      store.addAction(socketId, e.target);
      // e.target.send(JSON.stringify({ action_type: 'LOGIN', user: "user", password: "pwd", terminal: "web" }))
      // setVals({ 
      //    [`socketFlag${socketId}`]: true,
      //    [`isConnection${socketId}`]: connectionStatus[readyState]
      // });
   }

   const onCloseHandler = (e) => {
      let { readyState } = e.target;
      // setStates({ 
      //    type: "setVars", 
      //    newState: {
      //       [`socketFlag${socketId}`]: false,
      //       [`isConnection${socketId}`]: connectionStatus[readyState]
      //    }
      // })
   }

   const onMessageHandler = (e) => {
      // let respMsg = JSON.parse(e.data);
      // setDataHandler(respMsg);
   }

   const setDataHandler = (msg) => {
      // console.log(`rendered ${socketId}`, vars)
      // setStates({ type: `mappingResp${socketId}`, respMsg: msg });
   }

   const ws = useWebSocket(getURL[socketId], {
      onOpen: onOpenHandler,
      onClose: onCloseHandler,
      onMessage: onMessageHandler
   });

   useEffect(() => {;
      // store.addAction(socketId, ws);
   }, []);
   return (<></>)
});


export const WebsocketConnectionAction = memo(() => {
   const { netAction, netActionAux } = useContext(StoreContext);
   console.log("netAction", netActionAux, netAction.current)
   return (<>

   </>)
})

export default WebsocketConnection;