import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpvthsW0XbDu48jw95Uz4eSEnV5msbRp4",
  authDomain: "attendance-app-c97e8.firebaseapp.com",
  databaseURL: "https://attendance-app-c97e8-default-rtdb.firebaseio.com",
  projectId: "attendance-app-c97e8",
  storageBucket: "attendance-app-c97e8.appspot.com",
  messagingSenderId: "859814496024",
  appId: "1:859814496024:web:556618a972f2c4f6b4c06d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const database = getDatabase(app);

export { app, auth, database};
