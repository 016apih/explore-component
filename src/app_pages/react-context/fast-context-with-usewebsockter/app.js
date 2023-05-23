import React, { memo, useRef } from 'react';
import { Provider, ContextConnector, useNetAction } from './app-fast-context';
import WebsocketConnection from './app-websocket.js';

const Login = memo(() => {
   const { isErr, errMsg, setVals  } = ContextConnector(["isErr", "errMsg", "setVal"])
   const { sendAction } = useNetAction();

   const username = useRef(null);
   const pwd = useRef(null);

   const doLogin = () => {
      let user = username.current.value;
      let password = pwd.current.value;
      if(user !== "dxtest22" && password !== "password"){
         setVals({ isErr: true, errMsg: "Username/password invalid" });
      } else {
         sendAction({ action_type: 'LOGIN', user, password, terminal: "web" })
         setVals({ isLogin: true, user });
      }
   }

   return (<>
      <h3> Login Page </h3>
      {isErr ? <p className="alert alert-danger p-0 px-2 fw-bold">{errMsg}</p> : <></>}
      <label>
         username : <input type="text" defaultValue="dxtest22" ref={username} />
         Password : <input type="text" defaultValue="password" ref={pwd} />
         <button className="w-" onClick={doLogin}>
            Login
         </button>
      </label>
   </>)
})

const MainPage_base = memo((props) => {

   const { isLogin  } = ContextConnector(["isLogin"])

   return (<>
      {isLogin ? 
         <h3>Main Page</h3>
      : 
         <Login />
      }
   </>
   )
});

function App () {
   return (
      <Provider>
         <WebsocketConnection />
         <WebsocketConnection socketId="Aux" />
         <MainPage_base />
      </Provider>
   )
}

export default App;