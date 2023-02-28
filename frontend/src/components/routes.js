import React, { Component  } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeesPage from './admin/employees_page';
import UserPage from './user/user_page';
import UserDetails from './user/user_details';
import ManagePage from './user/manage_page';
import CompanyPage from './admin/company_page';
import TitlesPage from './admin/titles_page';
import Error from './error/error';
import { getUser } from '../actions/userActions';
import store from '../store';
import { connect } from 'react-redux';
import { isEmpty } from './utils';
import SSO from './sso/sso';

class routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes>
                {
                    !isEmpty(this.props.user) ?
                        <>
                            <Route exact path="/employees" element={<EmployeesPage />} />
                            <Route exact path="/user" element={<UserPage />} />
                            <Route exact path="/edituser" element={<ManagePage mode="edit" />} />
                            //<Route exact path="/adduser" element={<ManagePage mode="add" />} />
                            <Route exact path="/company" element={<CompanyPage />} />
                            <Route exact path="/titles" element={<TitlesPage />} />
                            <Route path="*" element={<Navigate to="/employees?mode=default" />} />
                        </>
                        :
                        <>
                            <Route exact path="*" element={<SSO />} />
                        </>
                }
            </Routes>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(routes); 