import React from 'react'

import { Navbar, Nav } from "react-bootstrap"; // import the necessary components from React Bootstrap

const MemberHeader = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/member">Member Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/ShowCurrentClass">Current Class</Nav.Link>
            <Nav.Link href="/LogHours">Log Hours</Nav.Link>
            <Nav.Link href="/EnrollClass">Enroll Class</Nav.Link>
            <Nav.Link href="/PastActivity">Past Activity</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    </div>
  )
}

export default MemberHeader