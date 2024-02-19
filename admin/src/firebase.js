import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyABCb7q0gp9ZgSi9V9sEW1PVwwRr_SLPNQ",
    authDomain: "lifeunderwater-f982b.firebaseapp.com",
    projectId: "lifeunderwater-f982b",
    storageBucket: "lifeunderwater-f982b.appspot.com",
    messagingSenderId: "18534472639",
    appId: "1:18534472639:web:e2340d9a4d6ac3c8605f0a",
    measurementId: "G-4KJ52XZ24R"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export { app, analytics };