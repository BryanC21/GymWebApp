import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import UserDetails from '../user/user_details';

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
                    <UserDetails />
                </Container>
                <br />
            </>
        );
    }
}

export default Admin;
