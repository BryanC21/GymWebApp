import React, { Component } from "react";
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from "../../store";
import { setUser } from "../../actions/userActions";

class NavUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow(show) {
        this.setState({ modalShow: show });
    }

    async handleLogout() {
        var api = process.env.REACT_APP_API || "http://localhost:5002";
        const response = await fetch(api + '/logout', { credentials: 'include' })
        if (response.status === 200) {
            await store.dispatch(setUser({}));
            window.location.replace("https://trial-1322739.okta.com/login/signout");
        } else {
            alert(response.statusText);
        }
    }

    render() {
        const user = this.props.user;
        return (
            <>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#" onClick={() => this.handleLogout()}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(NavUser);


