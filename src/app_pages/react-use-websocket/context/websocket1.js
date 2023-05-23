import { useEffect, createContext, useContext, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { url, url2 } from '../../../gitignore';

export const WebsocketContext = createContext();

export const useWs = () => useContext(WebsocketContext);

const WebSocketProvider = ({ children }) => {
   const [vars, setVars] = useState({
      isLogin: false,
      isErr: false,
      errMsg: ""
   });

   const ws1 = useWebSocket(url);
   const ws2 = useWebSocket(url2);

   const wsStatus1 = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[ws1.readyState];

   const wsStatus2 = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[ws2.readyState];

   return (
      <WebsocketContext.Provider value={{ ws1, wsStatus1, ws2, wsStatus2, vars, setVars }}>
         {children}
      </WebsocketContext.Provider>
   )
}

export default WebSocketProvider;