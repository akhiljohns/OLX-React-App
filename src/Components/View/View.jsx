import React ,{ useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../Store/PostContext';
import { firestore } from '../../FireBase/Config';
import { collection, getDocs, where,  query as firestoreQuery } from '@firebase/firestore'; // Import the 'query' function

function View() {

  const [userDetails, setUserDetails] = useState()
const {postDetails} = useContext(PostContext)

useEffect(() => {
  const userId = postDetails ? postDetails.userId : null;
  const usersRef = collection(firestore, 'users');
  const query = firestoreQuery(usersRef, where('id', '==', userId));

  getDocs(query)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
      });
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
    });
}, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
      {postDetails && (
  <div className="productDetails">
    <p>&#x20B9; {postDetails.price} </p>
    <span>{postDetails.name}</span>
    <p>{postDetails.category}</p>
    <span>{postDetails.createdAt}</span>
  </div>
)}

    {  userDetails &&  <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
         }
      </div>
    </div>
  );
}
export default View;
