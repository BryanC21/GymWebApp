import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser, setUserDetails} from '../../actions/userActions';
import Header from '../Header/Header';



const EmployeeLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('login');

        let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(`${baseURL}/api/sso/employeeSignin`, { params: { 'email': username, 'password': password } })
            .then(res => {
                console.log(res);
                dispatch(setUser(res.data.token));
                dispatch(setUserDetails(res.data.results));
                window.location.replace('/employee');
            })
            .catch(err => {
                console.log(err);
                alert('Invalid credentials');
            });

    }

    return (
        <div className="login">
            <Header />
            <form>
                <label> Username </label>
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                <label> Password </label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin}> Login </button>
            </form>
        </div>
    );

}

export default EmployeeLogin;