import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../Store/FirebaseContext";
import {getAuth , createUserWithEmailAndPassword , updateProfile } from 'firebase/auth'


export default function Signup() {
  const firestore = getFirestore();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { firebaseApp } = useContext(FirebaseContext);
const auth = getAuth(firebaseApp);

  const handleSubmit = (e) => {
    e.preventDefault();
createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
const user = userCredential.user;
      // Update the user's profile
      return updateProfile(user, {
        displayName: username,
        // You can include other profile fields here if needed
      }).then(()=>{
        const usersCollection = collection(firestore, 'users');
        addDoc(usersCollection, {
          id: user.uid,
          username: username,
          phone: phone
        }).then(() => {
          console.log("Navigating to /login");
          navigate("/login");
          
        }).catch((error) => {
          console.error("Error adding user to Firestore: ", error);
        });
      }).catch((error) => {
        console.error("Error updating user profile: ", error);
      });
    }).catch((error) => {
      console.error("Error creating user: ", error);
    });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
