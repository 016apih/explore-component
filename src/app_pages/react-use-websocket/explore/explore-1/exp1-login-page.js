import React, { memo, useRef } from 'react';
import { useNetwork } from '../../context/net-context';

const Exp1LoginPage = memo(() => {
   const { netAction, setStates, isErr, errMsg, isLoading  } = useNetwork();
   const username = useRef(null);
   const password = useRef(null);
   
   const doLogin = () => {
      let user = username.current.value;
      let pwd = password.current.value;
      setStates({ type: "setVar", key: "user", value: user });
      netAction.sendJsonMessage({ action_type: 'LOGIN', user, password: pwd, terminal: "web" })
   }

   return (<>
      <h3>LoginPage</h3>
      {isErr ? (
         <div className="alert alert-danger">{errMsg}</div>
      ) : <></>}
      
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
               disabled={isLoading}
            >
               Login
            </button>
         </div>
      </div>
   </>)
})

export default Exp1LoginPage;