import React from 'react';
import { useState } from 'react';
import axios from 'axios';


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
      <h1>User Account Form</h1>
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
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterMember;