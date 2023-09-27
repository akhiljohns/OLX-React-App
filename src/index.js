import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import Context, { FirebaseContext } from './Store/Context';
import { firebaseApp } from './FireBase/Config'; // Import as a named export
const root = createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ firebase:firebaseApp }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
