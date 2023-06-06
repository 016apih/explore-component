import React, { memo, useRef } from 'react';
import { useWs } from '../context/websocket2';

const LoginPage = memo(() => {
   const { sendWs, setVars, vars } = useWs();
   const username = useRef(null);
   const password = useRef(null);
   
   const doLogin = () => {
      let user = username.current.value;
      let pwd = password.current.value;
      setVars({ type: "SET_DO_LOGIN", payload: { user } })
      sendWs({ action_type: 'LOGIN', user, password: pwd, terminal: "web" })
   }

   return (<>
      <h3>LoginPage</h3>
      {vars.isErr ? (<div className="alert alert-danger">{vars.errMsg}</div>) : <></>}
      
      <div className="row">
         <div className="col-auto">
            <label>Username</label>
            <input type='text' placeholder='username' ref={username}
               defaultValue="dxtest22"
            />
         </div>
         <div className="col-auto">
            <label>Password</label>
            <input type='password' placeholder='password' ref={password}
               defaultValue="password"
            />
         </div>
         <div className="col-auto">
            <button className='btn btn-sm btn-primary'
               onClick={doLogin}
               disabled={vars.isLoading}
            >
               Login
            </button>
         </div>
      </div>
   </>)
})

export default LoginPage;