import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./Store/Context";
import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./Store/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(); 
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [firebase, setUser]);

  return (

    <div>
    <Post>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
    </Post>
    </div>
  );
}

export default App;
