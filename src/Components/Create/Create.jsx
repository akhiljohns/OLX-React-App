import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {FirebaseContext,AuthContext} from '../../Store/Context'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import the necessary functions
const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const handleSubmit = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `Images/${image.name}`);
    
    if (image) {
      // Upload the file to the specified location using uploadBytes
      uploadBytes(storageRef, image).then((snapshot) => {
        // Get the download URL for the uploaded file
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          // You can now use the download URL (e.g., save it to your database or display the image)
          console.log('Download URL:', downloadURL);
        
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.error('No file selected.');
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value={name}
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
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price"  value={price}
             onChange={(e) => setPrice(e.target.value)} />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0]);
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
