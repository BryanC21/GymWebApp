import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import NavUser from '../nav/nav_user';

class AdminNav extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            src={process.env.PUBLIC_URL + '/img/img.png'}
                            width="30"
                            height="30"
                            className="d-inline-block me-2"
                            alt=""
                        />
                        Four Guys ++
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/employees?mode=default">Employees</Nav.Link>
                            <Nav.Link href="/employees?mode=managers">Managers</Nav.Link>
                            <Nav.Link href="/company">Company</Nav.Link>
                        </Nav>

                        <Nav>
                            <NavUser/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default AdminNav;
