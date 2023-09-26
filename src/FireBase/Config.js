import { initializeApp } from 'firebase/app';
import 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export default firebaseApp;
