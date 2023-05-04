import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser, setUserDetails} from '../../actions/userActions';



const ShowCurrentClass = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let dispatch = useDispatch();

    const showClass = (e) => {
        e.preventDefault();
        console.log('login');

        let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(`${baseURL}/api/sso/userSignIn`, { params: { 'email': username, 'password': password } })
            .then(res => {
                console.log(res);
                alert('Login successful');
                dispatch(setUser(res.data.token));
                dispatch(setUserDetails(res.data.results));
                //TODO remove alert
                //TODO redirect to home page if user is set
            })
            .catch(err => {
                console.log(err);
                alert('Invalid credentials');
            });

    }

    return (
        <div className="show-class">
            <h1>Class Schedules</h1>
            <div class="class-schedule">
            
            </div>
        </div>
    );

}

export default ShowCurrentClass;