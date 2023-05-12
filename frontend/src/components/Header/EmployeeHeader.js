import React from 'react'

import { Navbar, Nav } from "react-bootstrap"; // import the necessary components from React Bootstrap

const EmployeeHeader = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Employee Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ListClasses">List Classes</Nav.Link>
            <Nav.Link href="/AddClasses">Add Classes</Nav.Link>
            <Nav.Link href="/RegisterMember">Register Members</Nav.Link>
            <Nav.Link href="/GymAnalytics">Gym Analytics</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    </div>
  )
}

export default EmployeeHeader