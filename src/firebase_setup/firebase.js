// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARK8uQuns8gx9WkXwEqVtfD_OLfmz1kpw",
  authDomain: "lazystore-ee511.firebaseapp.com",
  projectId: "lazystore-ee511",
  storageBucket: "lazystore-ee511.appspot.com",
  messagingSenderId: "854097511052",
  appId: "1:854097511052:web:55b0c57206d5d27fb031a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;