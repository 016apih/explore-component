import React, { memo, useState, useEffect } from 'react';

const LoginPage = memo(({ doLogin }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
      setUsername("dxtest22");
      setPassword("password");
   }, [])

   return (<>
      <h3>LoginPage</h3>
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
               onClick={() => doLogin(username, password)}
            >
               Login
            </button>
         </div>
      </div>
   </>)
})

export default LoginPage;