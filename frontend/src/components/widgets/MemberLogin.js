/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser, setUserDetails} from '../../actions/userActions';


import Nav from "../Template/Navbar/Nav";
import Icon from "../Template/GlobalComponents/Icon";
import scheduleBg from "../Template/Image/scheduleBg.jpg";
import Container from "../Template/GlobalComponents/Container";


const EmployeeLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('login');

        let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(`${baseURL}/api/sso/userSignin`, { params: { 'email': username, 'password': password } })
            .then(res => {
                console.log(res);
                //alert('Login successful');
                dispatch(setUser(res.data.token));
                dispatch(setUserDetails(res.data.results));
                window.location.replace('/member');
            })
            .catch(err => {
                console.log(err);
                alert('Invalid credentials');
            });

    }

    return (
        <div className="login">

        <Nav /> 

        <section css={styles} className="schedule" id="schedule">
            <h2>
                Member <span>Login</span>
            </h2>
            <Icon />
            <Container>
            <form>
                <h1>
                <label> Username </label>
                <br />
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                <br />
                <label> Password </label>
                <br />
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                </h1>
                <button onClick={handleLogin}> Login </button>
            </form>
            </Container>
            </section>
            
            
            {/* <Overlay_Login />
            <Nav_Member />
    

            <h1>
            <form>
                <label> Username </label>
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                <label> Password </label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin}> Login </button>
            </form>
            </h1>


            <Video /> */}
        </div>
    );

}

const styles = css`
  width: 100%;
  padding: 120px 0;
  min-height: 100vh;
  text-align: center;
  background: url('${scheduleBg}') no-repeat center/cover;
  h2 {
    color: #fff;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  p {
    color: #fff;
    font-size: 16px;
    line-height: 1.7;
    margin: 20px 0;
  }
  .container{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  @media(max-width: 640px) {
    p{
      padding: 0 30px;
      br{
        display: none;
      }
    }
    .container{
      max-width: 92%;
    }
  }
`;


export default EmployeeLogin;