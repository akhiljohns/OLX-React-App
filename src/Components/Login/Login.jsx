import React, { useState ,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from "../../Store/Context";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { firebaseApp } = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          // You can include additional user information here
        };
        console.log('User logged in:', user);
    
        // Store a flag in localStorage to indicate that the user is logged in
        localStorage.setItem('isLoggedIn', 'true');
    
        // Store the user object as a JSON string in localStorage
        localStorage.setItem('user', JSON.stringify(user));
    
        // Redirect the user to the desired page
        navigate("/");
      })
      .catch((error) => {
        console.log("LOGIN ERROR -=-=-=-=-=-", error);
      });
  };
  
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
