import React, { memo } from 'react';

import Exp1LoginPage from './explore-1/exp1-login-page.js';
import Exp1MainPage from './explore-1/exp1-main-page.js';

import { 
   NetworkProvider, useNetwork,
   WebsocketConnection
} from '../context/net-context';

const ExploreContextWebsocket = memo(() => {
   
   const { isLogin } = useNetwork();

   return (<>
      {isLogin ? 
         <Exp1MainPage />
      : 
         <Exp1LoginPage /> 
      }
   </>)
})

const MainPage = memo(() => {
   return (
      <NetworkProvider>
         <WebsocketConnection />
         <WebsocketConnection socketId="Aux"  />
         <ExploreContextWebsocket />
      </NetworkProvider>
   )
});

export default MainPage;