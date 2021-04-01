import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userInfoContext } from "../../App";
import { signOut } from "../Login/LoginManager";
import logo from '../../img/logo/logo.png';
import './Navbar.css';

const NavBar = () => {
  const {loggedInUser, setLoggedInUser} = useContext(userInfoContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand className="text-warning"> <img className="nav-img" src={logo} alt=""/> </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/home" className="text-light" >Home</Link></Nav.Link>
          <Nav.Link><Link to="/order" className="text-light" >Orders</Link></Nav.Link>
          <Nav.Link><Link to="/admin" className="text-light" >Admin</Link></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            <h4 className="text-light">{loggedInUser.displayName}</h4>
          </Nav.Link>
          <Nav.Link>
              {
                loggedInUser.email ? <Link to="/home" onClick={signOut, () => {setLoggedInUser({})}} className="btn btn-light" >Log Out</Link> : <Link className="btn btn-light" to='/login'>LogIn</Link>
              }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
