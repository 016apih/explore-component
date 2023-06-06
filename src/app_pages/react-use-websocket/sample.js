import React, { useState, memo, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import LoginPage from './components/login';
import MainPage from './components/main-page.js';

const nurl = process.env.URL || "wss://echo.websocket.events";
const nurl2 = process.env.URL2 || "wss://echo.websocket.events";

const WebSocketDemo = memo(() => {
   const [isLogin, setIslogin] = useState(false);

   const { sendMessage, lastMessage, sendJsonMessage, lastJsonMessage,  readyState } = useWebSocket(nurl);
   const ws2 = useWebSocket(nurl2)
   const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[readyState];

   useEffect(() => {
      console.log(ws2)
      if(connectionStatus === "Connecting"){
         setIslogin(false)
      }

      if (lastMessage !== null) {
         setDataHandler(JSON.parse(lastMessage.data));

         // setMessageHistory(lastMessage.data)
      }
      if(lastJsonMessage !== null){
         console.log("lastJsonMessage", lastJsonMessage, typeof(lastJsonMessage))
      }
   }, [lastMessage, connectionStatus]);

   const doLogin = useCallback((user, password) => {
      // sendMessage(JSON.stringify({ 
      //    action_type: 'LOGIN', user, password, terminal: "web" 
      // }) )
      sendJsonMessage({ 
         action_type: 'LOGIN', user, password, terminal: "web" 
      })
      console.log(user, password)
   }, []);

   const setDataHandler = (msg) => {
      if(typeof(msg) === "object"){
         let { action_type, sub_type, data } = msg;
         if(action_type === "LOGIN-RESPONSE"){
            setIslogin(msg.status === "OK" ? true : false)
         } else {
            console.log("NEW MSG : ", msg)
         }
      } else {
         // untuk string data
      }
   }

   console.log("connectionStatus", connectionStatus)

   return (<>
      <span className="alert alert-warning py-2">The WebSocket is currently <b>{connectionStatus}</b></span>

      {ReadyState.CONNECTING ? 
         <h5>Loading ...</h5> 
      : (!isLogin ? 
            <LoginPage doLogin={doLogin} />
         : 
            <MainPage />
      )}
   </>);
});

export default WebSocketDemo;