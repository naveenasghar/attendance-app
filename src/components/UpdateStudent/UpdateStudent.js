// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   updatePassword,
//   getAuth,
// } from "firebase/auth";
// import { getDatabase, ref as databaseRef, set } from "firebase/database";
// import {
//   getStorage,
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import { app } from "../../firebase"; // Make sure to import the app instance

// function UpdateStudent({
//   uid,
//   fname,
//   lname,
//   course,
//   PhoNo,
//   email,
//   password,
//   profilePictureUrl,
// }) {
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState("");
//   const [newFname, setNewFname] = useState("");
//   const [newLname, setNewLname] = useState("");
//   const [newCourse, setNewCourse] = useState("");
//   const [newPhoNo, setNewPhoNo] = useState("");
//   const [profilePicture, setProfilePicture] = useState(null);

//   const handleUpdatePasswordAndUser = async () => {
//     try {
//       const auth = getAuth(app);

//       // Update password
//       if (newPassword) {
//         await updatePassword(auth.currentUser, newPassword);
//       }

//       // Update user information
//       const userData = {
//         fname: newFname || fname,
//         lname: newLname || lname,
//         course: newCourse || course,
//         PhoneNo: newPhoNo || PhoNo,
//         Email: email,
//         password: newPassword || password,
//         profilePictureUrl: profilePictureUrl,
//       };

//       const storage = getStorage(app);

//       if (profilePicture) {
//         const profilePicturePath = `profilePictures/${uid}`;
//         const profilePictureRef = storageRef(storage, profilePicturePath);

//         await uploadBytes(profilePictureRef, profilePicture);
//         const newProfilePictureUrl = await getDownloadURL(profilePictureRef);

//         userData.profilePictureUrl = newProfilePictureUrl;
//       }

//       const database = getDatabase(app);
//       const data = {
//         uid: uid,
//         userData: userData,
//       };

//       await set(databaseRef(database, "Students/" + uid), data);

//       console.log("Password and user data updated successfully");
//     } catch (error) {
//       console.error("Error updating password and user: ", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Password and User Info</h2>
//       <input
//         type="password"
//         placeholder="New Password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="New First Name"
//         value={newFname}
//         onChange={(e) => setNewFname(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="New Last Name"
//         value={newLname}
//         onChange={(e) => setNewLname(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="New Course"
//         value={newCourse}
//         onChange={(e) => setNewCourse(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="New Phone no"
//         value={newPhoNo}
//         onChange={(e) => setNewPhoNo(e.target.value)}
//       />
//       <input
//         type="file"
//         onChange={(e) => setProfilePicture(e.target.files[0])}
//       />
//       <button onClick={handleUpdatePasswordAndUser}>
//         Update Password and User
//       </button>
//     </div>
//   );
// }

// export default UpdateStudent;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updatePassword,
  getAuth,
} from "firebase/auth";
import { getDatabase, ref as databaseRef, get, set } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase"; // Make sure to import the app instance

function UpdateStudent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newPhoNo, setNewPhoNo] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  let uid = 'SQ9GoAtlh3Mdr3fsX7NAaULLDVH3'
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const database = getDatabase(app);
        const userRef = databaseRef(database, "Students/" + uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val().userData);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleUpdatePasswordAndUser = async () => {
    try {
      const auth = getAuth(app);

      // Update password
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      // Update user information
      const updatedUserData = {
        fname: newFname || userData.fname,
        lname: newLname || userData.lname,
        course: newCourse || userData.course,
        PhoneNo: newPhoNo || userData.PhoneNo,
        Email: userData.Email || "",
        password: newPassword || userData.password,
        profilePictureUrl: userData.profilePictureUrl,
      };
      console.log("Updated User Data:", updatedUserData); 
      const storage = getStorage(app);

      if (profilePicture) {
        const profilePicturePath = `profilePictures/${uid}`;
        const profilePictureRef = storageRef(storage, profilePicturePath);

        await uploadBytes(profilePictureRef, profilePicture);
        const newProfilePictureUrl = await getDownloadURL(profilePictureRef);

        updatedUserData.profilePictureUrl = newProfilePictureUrl;
      }

      const database = getDatabase(app);
      const data = {
        uid: uid,
        userData: updatedUserData,
      };

      await set(databaseRef(database, "Students/" + uid), data);

      console.log("Password and user data updated successfully");
    } catch (error) {
      console.error("Error updating password and user: ", error);
    }
  };

  return (
    <div>
      <h2>Update Password and User Info</h2>
      {/* Render input fields with the previous user data as default values */}
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="New First Name"
        value={newFname || userData.fname || ""}
        onChange={(e) => setNewFname(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Last Name"
        value={newLname || userData.lname || ""}
        onChange={(e) => setNewLname(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Course"
        value={newCourse || userData.course || ""}
        onChange={(e) => setNewCourse(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Phone no"
        value={newPhoNo || userData.PhoneNo || ""}
        onChange={(e) => setNewPhoNo(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
      <button onClick={handleUpdatePasswordAndUser}>
        Update Password and User
      </button>
    </div>
  );
}

export default UpdateStudent;
