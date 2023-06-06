import React, { memo, useRef } from 'react';
// import createFastContext from '../fast-context-generic/createFastContext';
import { Provider, ContextConnector } from './app-fast-context';

const arrField = ["isLogin", "isErr", "errMsg", "setVal" ];

const MainPage_base = memo((props) => {

   const username = useRef(null);
   const pwd = useRef(null);

   const {isLogin,  isErr, errMsg, setVals } = ContextConnector(arrField)

   const doLogin = () => {
      let user = username.current.value;
      let password = pwd.current.value;
      if(user !== "11" && password !== 22){
         setVals({ isErr: true, errMsg: "Username/password invalid" });
      } else {
         setVals({ isLogin: true });
      }
   }

   return (<>
      {isLogin ? 
         <h3>Main Page</h3>
      : 
         <p>
            <h3> Login Page </h3>
            {isErr ? <p className="alert alert-danger p-0 px-2 fw-bold">{errMsg}</p> : <></>}
            <label>username :
               <input ref={username} />
            </label>
            <label>Password :
               <input ref={pwd} />
            </label>
            <button className="w-" onClick={doLogin}>
               Login
            </button>
         </p>
      }
   </>
   )
});

function App () {
   return (
      <Provider>
         <MainPage_base />
      </Provider>
   )
}

export default App;