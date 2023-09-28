import React, { useState, useContext } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Import getDocs

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Waveform } from "@uiball/loaders";
import { FirebaseContext } from "../../Store/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Signup() {
  const firestore = getFirestore();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { firebaseApp } = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email or phone already exists
    const usersCollection = collection(firestore, "users");
    const querySnapshot = await getDocs(usersCollection);
    let emailExists = false;
    let phoneExists = false;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email === email) {
        emailExists = true;
      }
      if (userData.phone === phone) {
        phoneExists = true;
      }
    });
    // Inside the if (emailExists) block
    if (emailExists) {
      // Set the error message within the <p> element
      document.getElementById("errMsg").innerText =
        "!! Email Already Exists !!";
      console.error("Email already exists.");
      // You can show an error message or do something else here
      return;
    }

    // // Check if email contains "@gmail.com" at the end
    // if (!email.endsWith("@gmail.com")) {
    //   // Set the error message within the <p> element
    //   document.getElementById('errMsg').innerText = '!! Invalid Email Format. Please use "@gmail.com" !!';
    //   console.error("Invalid email format.");
    //   // You can show an error message or do something else here
    //   return;
    // }

    if (phoneExists) {
      // Handle phone number already exists
      document.getElementById("errMsg").innerText =
        "!! Phone Number Already Exists !!";
      console.error("Phone number already exists.");
      // You can show an error message or do something else here
      return;
    }

    // Set loading to true when starting registration
    setLoading(true);

    // If email and phone are unique, proceed with user registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Update the user's profile
        return updateProfile(user, {
          displayName: username,
          // You can include other profile fields here if needed
        })
          .then(() => {
            // Add user data to Firestore
            addDoc(usersCollection, {
              id: user.uid,
              username: username,
              phone: phone,
              email: email, // You may want to store email for future reference
            })
              .then(() => {
                console.log("Navigating to /login");
                navigate("/login");
              })
              .catch((error) => {
                console.error("Error adding user to Firestore: ", error);
              });
          })
          .catch((error) => {
            console.error("Error updating user profile: ", error);
          });
      })
      .catch((error) => {
        // console.log("Error creating user: ", error);
        if (error.message.includes("(auth/invalid-email)")) {
          document.getElementById("errMsg").innerText =
            "!! Invalid Email Format. Please use a valid Email !!";
        } else{
          document.getElementById("errMsg").innerText =
            "Server Timed Out, Try Again After Some Time";
        }
      })
    .finally(() => {
      // Set loading to false when registration is complete
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   if (loading) {
  //     // Hide the loader after 10 seconds
  //     const loaderTimeout = setTimeout(() => {
  //       setLoading(false);
  //     }, 1000); // 10 seconds in milliseconds

  //     return () => {
  //       clearTimeout(loaderTimeout);
  //     };
  //   }
  // }, [loading]);

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              const formattedUsername = e.target.value.replace(
                /[^A-Za-z ]/g, // Pattern allowing letters and spaces
                ""
              );
              setUsername(formattedUsername);
             
              
            }}
            id="fname"
            name="name"
           
            title="Please Enter Only Alphabetic Characters"
            required
          />

          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            title="Please Enter A Valid Email"
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => {
              // Remove any non-digit characters from the input
              const formattedPhone = e.target.value.replace(/\D/g, "");

              // Set the phone state only if it's 10 digits
              if (formattedPhone.length <= 10) {
                setPhone(formattedPhone);
              }
            }}
            id="phone"
            name="phone"
            pattern="[0-9]*"
            title="Please Enter Only Numbers (maximum 10 digits)"
            minLength={10}
            maxLength={10}
            required
          />

          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            minLength={6}
            title="Password Should Contain 6 Characters"
            required
          />
          <br />
          <br />
          <button className="hvr-radial-out" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
        <a href="/login" className="hvr-grow-shadow">
          Login
        </a>
        <p id="errMsg"></p>
        {loading && (
          <div className="loader-container">
            <Waveform />
          </div>
        )}
      </div>
    </div>
  );
}
