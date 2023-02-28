import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import ManageUser from '../user/manage_user';

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
                    <ManageUser mode={this.props.mode} />
                </Container>
                <br />
            </>
        );
    }
}

export default Admin;
