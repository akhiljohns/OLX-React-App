import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { FirebaseContext } from './Store/FirebaseContext';
import firebaseApp from './FireBase/Config'; 

const root = createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ firebaseApp }}>
    <App />
  </FirebaseContext.Provider>
);
