import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import Departments from '../admin/departments';

class DepartmentsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AdminNav />
                <br />
                <Container className="mb-4">
                    <Departments />
                </Container>
                <br />
            </>
        );
    }
}

export default DepartmentsPage;
