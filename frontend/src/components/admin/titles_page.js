import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import Employees from '../admin/employees';

class Admin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AdminNav />
                <br />
                <Container>
                    <Employees />
                </Container>
                <br />
            </>
        );
    }
}

export default Admin;
