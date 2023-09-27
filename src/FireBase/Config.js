import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAKZBrz_A-SSTD77Ubkm8zwj-4WS-nPEBo",
    authDomain: "olx-rc.firebaseapp.com",
    projectId: "olx-rc",
    storageBucket: "olx-rc.appspot.com",
    messagingSenderId: "58938089746",
    appId: "1:58938089746:web:cf73f6b603897eb9fed3cb",
    measurementId: "G-D1HNB31Y06"
  }


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth }; // Export as named exports













