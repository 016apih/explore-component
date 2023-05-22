import React, { useState, useEffect, memo, useRef } from 'react';

import WebSocketProvider, { useWs } from './context/websocket1';
import LoginPage from './components/login';
import MainPage from './components/main-page';

const MainComp = memo(() => {
   let { ws1, wsStatus1, ws2, wsStatus2, vars, setVars } = useWs();

   const doLogin = (user, password) => {
      setVars(s => ({ ...s, user }))
      ws1.sendJsonMessage({ 
         action_type: 'LOGIN', user, password, terminal: "web" 
      })
   }
   
   useEffect(() => {
      if(ws1.lastJsonMessage !== null){
         setDataHandler1(ws1.lastJsonMessage)
      }

      if(ws2.lastJsonMessage !== null){
         setDataHandler2(ws2.lastJsonMessage)
      }
   }, [ws1.lastJsonMessage, ws2.lastJsonMessage])

   const setDataHandler1 = (msg) => {
      if(typeof(msg) === "object"){
         let { action_type, sub_type, data, session_id } = msg;
         if(action_type === "LOGIN-RESPONSE"){
            setVars(s => ({ ...s, ...msg }));
            ws2.sendJsonMessage({ user: vars.user, session_id, stringify: "true" })
         } else {
            console.log("NEW MSG : ", msg)
         }
      } else {
         // untuk string data
      }
   } 

   const setDataHandler2 = (msg) => {
      if(typeof(msg) === "object"){
         let { action_type, sub_type, status, data } = msg;
         if(action_type === "DF-RESPONSE"){
            setVars(s => ({ ...s, isLogin: status === "OK" ? true : false }));
         } else {
            console.log("NEW MSG 2 : ", msg)
         }
      } else {
         // untuk string data
      }
   } 
   
   return (<>
      <span className="alert alert-warning py-2">
         The WebSocket port 12000 <b>{wsStatus1}</b>
         &nbsp;&nbsp;&nbsp;
         The WebSocket port 5050 <b>{wsStatus2}</b>
      </span>

      {wsStatus1 === "Connecting" || wsStatus2 ===  "Connecting" ? 
         <h5>Loading ...</h5> 
      : (!vars.isLogin ? 
            <LoginPage doLogin={doLogin} />
         : 
            <MainPage />
      )}
   </>)
});

const WebsocketWithContext = memo(() => {
   return (
      <WebSocketProvider>
         <MainComp />
      </WebSocketProvider>
   )
})

export default WebsocketWithContext;