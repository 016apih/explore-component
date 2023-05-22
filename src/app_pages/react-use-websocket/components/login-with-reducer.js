import React, { memo, useState, useEffect } from 'react';
import { useWs } from '../context/websocket2';

const LoginPage = memo(() => {
   const { sendWs, setVars, vars } = useWs();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   
   const doLogin = () => {
      setVars({ type: "SET_DO_LOGIN", payload: { user: username } })
      sendWs({ action_type: 'LOGIN', user: username, password, terminal: "web" })
   }

   useEffect(() => {
      setUsername("dxtest22");
      setPassword("password");
   }, [])

   console.log(vars)

   return (<>
      <h3>LoginPage</h3>
      {vars.isErr ? (<div className="alert alert-danger">{vars.errMsg}</div>) : <></>}
      
      <div className="row">
         <div className="col-auto">
            <label>Username</label>
            <input type='text' placeholder='username'
               value={username}
               onChange={e => setUsername(e.target.value)}
            />
         </div>
         <div className="col-auto">
            <label>Password</label>
            <input type='password' placeholder='password'
               value={password}
               onChange={e => setPassword(e.target.value)}
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