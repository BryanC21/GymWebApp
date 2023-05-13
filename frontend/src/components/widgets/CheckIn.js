/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState } from 'react';
import axios from 'axios';

import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";

const CheckIn = () => {
    const [userId, setUserId] = useState('');
    const [employeeId, setEmployeeId] = useState('1');

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';


    const checkInUser = async (userId, employeeId) => {
        try {
            const res = await axios.get(baseURL + '/api/user/checkinUser', {
                params: {
                    user_id: userId,
                    employee_id: employeeId,
                }
            });
            //TODO save checkout id but where?
            console.log(res);
            alert('User checked in successfully');

        } catch (error) {
            console.error(error);
            alert('Error checking in user');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkInUser(userId, employeeId);
    };

    return (
        <div className='check-in'>


            <section css={styles} className="trainers" id="trainers">
                <h2>
                    <span>Check In</span>
                </h2>
                <Icon />
                <Container>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userId">User ID:</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        {/*<label htmlFor="employeeId">Employee ID:</label>
                        <input
                            type="text"
                            id="employeeId"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />*/}
                        <button type="submit">Check In</button>
                    </form>
                </Container>
            </section>
        </div>

    );
};

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

export default CheckIn;