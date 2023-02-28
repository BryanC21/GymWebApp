import React from 'react';
import store from '../../store';
import { setUser } from '../../actions/userActions';

class SSO extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getIdentity();
    }
    async getIdentity() {
        var api = process.env.REACT_APP_API ||"http://localhost:5002";
        const response = await fetch(api + '/useridentity', { credentials: 'include' })
        if (response.status === 200) {
            const data = await response.json();
            await store.dispatch(setUser(data.user));
        } else {
            this.redirectToLogin();
        }
    }
    redirectToLogin() {
        window.location.replace(process.env.REACT_APP_LOGIN || "http://localhost:5002/login");
    }

    render() {
        return (
            <></>
        )
    }
}
export default SSO;
