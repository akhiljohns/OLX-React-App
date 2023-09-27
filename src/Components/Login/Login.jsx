import React, { useState ,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from "../../Store/FirebaseContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { firebaseApp } = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);


const handleLogin = (e) => {
e.preventDefault()
signInWithEmailAndPassword(auth,email,password).then(() => {
alert('Login successful')
}).catch((error)=> {
console.log("LOGIN ERROR -=-=-=-=-=-",error)
})
}

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="lname"
            onChange={(e)=>setPassword(e.target.value)}
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
