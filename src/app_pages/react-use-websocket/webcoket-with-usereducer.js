import React, { memo } from 'react';

import WebSocketProvider, { useWs } from './context/websocket2';
import LoginPage from './components/login-with-reducer';
import MainPage from './components/main-page';

const MainComp = memo(() => {
   let { wsStatus1, wsStatus2, vars } = useWs();
   
   return (<>
      <span className="alert alert-warning py-2">
         The WebSocket port 12000 <b>{wsStatus1}</b>
         &nbsp;&nbsp;&nbsp;
         The WebSocket port 5050 <b>{wsStatus2}</b>
      </span>

      {wsStatus1 === "Connecting" || wsStatus2 ===  "Connecting" ? 
         <h5>Loading ...</h5> 
      : (!vars.isLogin ? 
            <LoginPage />
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