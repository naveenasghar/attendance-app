// import React, { useEffect, useState } from "react";
// import { ref, onValue } from "firebase/database";
// import { database } from "../../firebase"; // Import the Firebase database instance

// import styles from "./Students.module.css";

// function Students() {
//   const [studentsData, setStudentsData] = useState(null);

//   useEffect(() => {
//     const studentRef = ref(database, 'Students/');

//     onValue(studentRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         // Set the data in state
//         setStudentsData(data);
//       } else {
//         console.log('Data not found');
//       }
//     });

//     // Cleanup function to detach the listener when the component is unmounted
//     return () => {
//       // Detach the event listener here if needed
//     };
//   }, []);

//   return (
//     <div>
//       {studentsData && (
//         <table className={styles.studentsTable}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Profile img</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Course</th>
//               <th>Name</th>
//               <th>Password</th>
//               {/* Add other table headers based on your data structure */}
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(studentsData).map(([id, student], index) => (
//               <tr id={id}>
//                 <td>{index}</td>
//                 <td><img width={25+'px'} src={student.userData.profilePictureUrl} alt="profileimg"/></td>
//                 <td>{student.userData.Email}</td>
//                 <td>{student.userData.PhoneNo}</td>
//                 <td>{student.userData.course}</td>
//                 <td>{student.userData.fname} {student.userData.lname}</td>
//                 <td>{student.userData.password}</td>
//                 {/* Add other table cells based on your data structure */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Students;


import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import styles from "./Students.module.css";
import UpdateStudent from "../UpdateStudent/UpdateStudent";

function Students() {
  const [studentsData, setStudentsData] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const studentRef = ref(database, 'Students/');

    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStudentsData(data);
      } else {
        console.log('Data not found');
      }
    });

    return () => {
      // Detach the event listener here if needed
    };
  }, []);



  const handleRowClick = (studentId) => {
    // Set the selected student ID and pass it as prop to another component
    setSelectedStudentId(studentId);
    console.log(studentId)
    
  };

  return (
    <div>
      {studentsData && (
        <table className={styles.studentsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile img</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Course</th>
              <th>Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(studentsData).map(([id, student], index) => (
              <tr key={id}>
                <td>{index}</td>
                <td><img width={25+'px'} src={student.userData.profilePictureUrl} alt="profileimg"/></td>
                <td>{student.userData.Email}</td>
                <td>{student.userData.PhoneNo}</td>
                <td>{student.userData.course}</td>
                <td>{student.userData.fname} {student.userData.lname}</td>
                <td>{student.userData.password}</td>
                <td>
                  {/* Add a button within each cell to handle the click */}
                  <button onClick={() => handleRowClick(id)}>Click</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedStudentId && (
        <AnotherComponent studentId={selectedStudentId} />
      )}
    </div>
  );
}

// AnotherComponent.js
const AnotherComponent = ({ studentId }) => {
  // Use the selected student ID here
  return (
    <div>
      <h2>Selected Student ID: {studentId}</h2>
      {/* Display other information as needed */}
    </div>
  );
};

export default Students;
