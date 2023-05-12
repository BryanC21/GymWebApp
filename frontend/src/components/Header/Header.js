import React from 'react'

import { Navbar, Nav } from "react-bootstrap"; // import the necessary components from React Bootstrap

const MemberHeader = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">TechFit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/MemberLogIn">Member Login</Nav.Link>
            <Nav.Link href="/EmployeeLogIn">Employee Login</Nav.Link>
            <Nav.Link href="/Gym">About Us</Nav.Link>
            <Nav.Link href="/member">Member</Nav.Link>
            <Nav.Link href="/employee">Employee</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    </div>
  )
}

export default MemberHeader