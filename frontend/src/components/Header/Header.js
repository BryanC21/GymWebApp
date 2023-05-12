import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../../actions/userActions';
import { setUserDetails } from '../../actions/userActions';

import { Navbar, Nav } from "react-bootstrap"; // import the necessary components from React Bootstrap

const MemberHeader = () => {

  const info = useSelector(state => state.userState);
  const user = useSelector(state => state.userDetailsState);
  const dispatch = useDispatch();
  const [isEmployee, setIsEmployee] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    console.log("TOKEN: ", info);
    console.log("USER: ", user.userDetails);

    if (info.user !== null && user.userDetails !== null) {
      if (user.userDetails.level_id === 1 || user.userDetails.level_id === 2) {
        setIsEmployee(true);
        setIsMember(false);
      } else if (user.userDetails.level_id === 3 || user.userDetails.level_id === 4) {
        setIsMember(true);
        setIsEmployee(false);
      }
    }

  }, [info, user]);

  const handlerLogOut = () => {
    dispatch(setUser(null));
    dispatch(setUserDetails(null));
    window.location.replace("/");
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" style={{ paddingLeft: "10px"}}>TechFit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Gym">About Us</Nav.Link>
            {!isEmployee && !isMember ? (
              <Nav>
                <Nav.Link href="/MemberLogIn">Member Login</Nav.Link>
                <Nav.Link href="/EmployeeLogIn">Employee Login</Nav.Link>
              </Nav>
            ) : (
              <div>
                <Nav.Link onClick={handlerLogOut}>Log Out</Nav.Link>
              </div>
            )}
            {isMember &&
              <Nav.Link href="/member">Member</Nav.Link>
            }
            {isEmployee &&
              <Nav.Link href="/employee">Employee</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    </div >
  )
}

export default MemberHeader
