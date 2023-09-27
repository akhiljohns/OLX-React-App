import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import the necessary Firestore functions
import Heart from '../../assets/Heart';
import './Post.css';
import { onSnapshot } from 'firebase/firestore';
function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const firestore = getFirestore(firebase);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = collection(firestore, 'products'); // Use the collection function to reference the "products" collection

    // Use the onSnapshot method to listen for changes in the collection
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const allPost = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      console.log(allPost);
      setProducts(allPost);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map(product => (
  <div className="card" key={product.id}>
    <div className="favorite">
      <Heart></Heart>
    </div>
    <div className="image">
      <img src={product.url} alt="image" />
    </div>
    <div className="content">
      <p className="rate">&#x20B9;{product.price}</p>
      <span className="kilometer">{product.category}</span>
      <p className="name">{product.name}</p>
    </div>
    <div className="date">
      <span>j</span>
    </div>
  </div>
))}
       </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
