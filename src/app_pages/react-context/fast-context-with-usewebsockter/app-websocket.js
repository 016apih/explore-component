import React, { memo, useContext, useEffect, forwardRef, useImperativeHandle } from 'react';

import useWebSocket from 'react-use-websocket';
import { StoreContext } from './app-fast-context';

const getURL = { "": process.env.URL, "Aux": process.env.URL2 };

export const WebsocketConnection = memo(({ socketId="" }) => {
   const { onOpenHandler, onCloseHandler, onMessageHandler} = useContext(StoreContext)

   useWebSocket(getURL[socketId], {
      onOpen: (e) => onOpenHandler(socketId, e),
      onClose: (e) => onCloseHandler(socketId, e),
      onMessage: (e) => onMessageHandler(socketId, e)
   });

   useEffect(() => {
      // console.log("ke render brpa kali")
   }, []);

   return (<></>)
});

/** belum bener */
export const WebsocketConnectionAction = memo(forwardRef(({ socketId = ""}, ref) => {
   const store = useContext(StoreContext);

   if(!store){
      throw new Error("Store not found")
   }
   
   useImperativeHandle(ref, () => {
      if(socketId === ""){
         return {
            sendAction: store.sendAction,
         }
      } else {
         return { 
            sendActionAux: store.sendActionAux
         }
      }
   }, [])

   console.log("WebsocketConnectionAction ke render")
   return (<></>)

}))

export default WebsocketConnection;