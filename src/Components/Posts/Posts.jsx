import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { getFirestore, collection } from 'firebase/firestore'; // Import the necessary Firestore functions
import './Post.css';
import { onSnapshot } from 'firebase/firestore';
import { PostContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router';

function Posts() {

  const { firebase } = useContext(FirebaseContext);
  const firestore = getFirestore(firebase);

  const { setPostDetails } = useContext(PostContext);

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productsRef = collection(firestore, 'products');

    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        const data = product.data();
      
        return {
          ...data,
          id: product.id,
          
        };
      });
      console.log(allPost);
      setProducts(allPost);
    });

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
          {products.map((product) => (
            <div className="card" onClick={() => {
              setPostDetails(product);
              navigate('/view');
            }} key={product.id}>
              <div className="favorite">
              </div>
              <div className="image">
                <img src={product.url} alt="image" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
}

export default Posts;
