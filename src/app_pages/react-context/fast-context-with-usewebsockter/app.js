import React, { memo, useRef } from 'react';
// import createFastContext from '../fast-context-generic/createFastContext';
import { Provider, ContextConnector } from './app-fast-context';
import WebsocketConnection, { WebsocketConnectionAction } from './app-websocket.js';

const login = (user, password) => ({text:  // ✅
   JSON.stringify({ 
      action_type: 'LOGIN', user, password, terminal: "web" 
   }) 
})

const arrField = ["isLogin", "isErr", "errMsg", "setVal" ];

const MainPage_base = memo((props) => {

   const username = useRef(null);
   const pwd = useRef(null);

   const {isLogin,  isErr, errMsg, setVals } = ContextConnector(arrField)

   const doLogin = () => {
      let user = username.current.value;
      let password = pwd.current.value;
      if(user !== "dxtest22" && password !== "password"){
         setVals({ isErr: true, errMsg: "Username/password invalid" });
      } else {
         setVals({ isLogin: true });
      }
   }

   return (<>
      {isLogin ? 
         <h3>Main Page</h3>
      : 
         <>
            <h3> Login Page </h3>
            {isErr ? <p className="alert alert-danger p-0 px-2 fw-bold">{errMsg}</p> : <></>}
            <label>
               username : <input type="text" defaultValue="dxtest22" ref={username} />
               Password : <input type="text" defaultValue="password" ref={pwd} />
               <button className="w-" onClick={doLogin}>
                  Login
               </button>
            </label>
         </>
      }
   </>
   )
});

function App () {
   return (
      <Provider>
         <WebsocketConnection />
         <WebsocketConnection socketId="Aux" />
         {/* <WebsocketConnectionAction /> */}
         <MainPage_base />
      </Provider>
   )
}

export default App;