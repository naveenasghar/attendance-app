import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddStudent from '../AddStudent/AddStudent'
import UpdateStudent from '../UpdateStudent/UpdateStudent'
import Students from "../Students/Students";

function Home(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => {
    setIsNavOpen(true);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      <div id="mySidenav" className={`sidenav ${isNavOpen ? 'open' : ''}`}>
      <button type="button" className="closebtn" onClick={closeNav}>&times;</button>
        <AddStudent />
        {/* <UpdateStudent /> */}
      </div>

      <button onClick={openNav}>&#9776; open</button>


      <br />
      <br />
      <br />
      <Students />

      <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
    </div>
  );
}

export default Home;
