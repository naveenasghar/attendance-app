import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getDatabase, ref as databaseRef, set,} from "firebase/database";
import {getStorage,ref as storageRef,uploadBytes,getDownloadURL} from "firebase/storage";

import styles from "./AddStudent.module.css";
import { app } from "../../firebase"; // Make sure to import the app instance

function AddStudent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [course, setCourse] = useState("");
  const [PhoNo, setPhoNo] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSignUp = async () => {
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Additional user information to be stored in the database
      const userData = {
        fname: fname,
        lname: lname,
        course: course,
        PhoneNo: PhoNo,
        Email : email,
        password : password,
        // Add the following line for a profile picture URL
        profilePictureUrl: null,
      };

      // Upload a profile picture to Firebase Storage
      const storage = getStorage(app);

      // Construct the path for the profile picture
      const profilePicturePath = `profilePictures/${user.uid}`;

      // Use ref with the constructed path
      const profilePictureRef = storageRef(storage, profilePicturePath);

      if (profilePicture) {
        await uploadBytes(profilePictureRef, profilePicture);
        const profilePictureUrl = await getDownloadURL(profilePictureRef);

        // Update userData with the profile picture URL
        userData.profilePictureUrl = profilePictureUrl;
      }

      // After successful authentication, save student data to the Realtime Database
      const database = getDatabase(app);
      const data = {
        uid: user.uid,
        userData: userData,
      };

      await set(databaseRef(database, "Students/" + user.uid), data);

      // Success. You can navigate to another page if needed.
      console.log("User and student data created successfully");
      // navigate("/dashboard");
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };


  return (
    // ... (rest of your component)

    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone no"
        value={PhoNo}
        onChange={(e) => setPhoNo(e.target.value)}
      />
      <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default AddStudent;

