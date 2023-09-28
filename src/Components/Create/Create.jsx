import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../Store/Context";
import { Waveform } from "@uiball/loaders";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const firestore = getFirestore(firebase);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !category || !image) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    setLoading(true);

    const storage = getStorage();
    const storageRef = ref(storage, `Images/${image.name}`);

    // Upload the file to the specified location using uploadBytes
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        // Get the download URL for the uploaded file
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            const productData = {
              name: name,
              category: category,
              price: parseFloat(price),
              url: downloadURL,
              userId: user.uid,
            };

            const productsCollection = collection(firestore, "products");

            // Add the product data to Firestore
            addDoc(productsCollection, productData)
              .then(() => {
                console.log("Product data saved to Firestore successfully!");
                navigate('/');
              })
              .catch((error) => {
                console.error("Error saving product data to Firestore:", error);
                navigate('/create');
              });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            navigate('/create');
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        navigate('/create');
      }).finally(() => {
        // Set loading to false when registration is complete
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        {error && <p className="error">{error}</p>}
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="Price"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : 'https://static.semrush.com/power-pages/media/favicons/olx-pl-favicon-0a9637d9.png'}
        ></img>
        <br />
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          required
          type="file"
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
        {loading && (
          <div className="loader-container">
            <Waveform />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Create;
