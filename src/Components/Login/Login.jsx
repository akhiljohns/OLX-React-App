import React from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href="/signup">Signup</a>
        <p id="errMsg"></p>
      </div>
    </div>
  );
}

export default Login;
