/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";


const RegisterMember = () => {

  let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    gender_id: '',
    level_id: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseURL}/api/user/enrollUser`, {
        params: user,
      });
      console.log('User data:', response.data);
      alert('User data sent successfully');
    } catch (error) {
      console.error('Error sending user data:', error);
      alert('Error sending user data');
    }
  };

  return (
    <div className='register'>



      <div>
        <section css={styles} className="trainers" id="trainers">
          <h2>
            <span>User Account Form</span>
          </h2>
          <Icon />
          <Container>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  name="first_name"
                  placeholder="First Name"
                  value={user.first_name}
                  onChange={handleChange}
                />
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={user.last_name}
                  onChange={handleChange}
                />
                <br />
                <br />
                <input
                  name="gender_id"
                  placeholder="Gender ID"
                  value={user.gender_id}
                  onChange={handleChange}
                />
                <input
                  name="level_id"
                  placeholder="Level ID"
                  value={user.level_id}
                  onChange={handleChange}
                />
                <br />
                <br />
                <input
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={handleChange}
                />
                <br />
                <br />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                />
                <br />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}


const styles = css`
  width: 100%;
  padding: 120px 0;
  vertical-align: center;
  min-height: 50vh;
  text-align: center;
  h2 {
    color: #232d39;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  > p {
    color: #7a7a7a;
    font-size: 16px;
    line-height: 1.7;
  }
  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  @media (max-width: 640px) {
    > p {
      padding: 0 30px;
      br {
        display: none;
      }
    }
  }
  @media (max-width: 830px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
  }
  @media (min-width: 831px) and (max-width: 1226px) {
    .container {
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 780px;
    }  

  }
`;

export default RegisterMember;