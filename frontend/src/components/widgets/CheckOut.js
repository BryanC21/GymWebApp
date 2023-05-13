/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState } from 'react';
import axios from 'axios';

import Icon from "../Template/GlobalComponents/Icon";
import scheduleBg from "../Template/Image/scheduleBg.jpg";
import Container from "../Template/GlobalComponents/Container";


const CheckOut = () => {
    const [checkin_id, setCheckin_id] = useState('');
    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';


    const checkOutUser = async (someID) => {

        try {
            axios.get(baseURL + '/api/user/getCheckinByUserId', { params: { user_id: someID } })
                .then(response => {
                    axios.get(baseURL + '/api/user/checkoutUser', {
                        params: {
                            checkin_id: response.data.results.id,
                        }
                    }).then(res => {
                        console.log(res);
                        alert('User checked out successfully');
                    }).catch(error => {
                        console.error(error);
                        alert('Error checking out user');
                    }
                    )
                })

                .catch(error => {
                    console.error(error);
                    alert('Error checking out user');
                }
                )

        } catch (error) {
            console.error(error);
            alert('Error checking out user');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkOutUser(checkin_id);
    };

    return (
        <div>
            <section css={styles} className="schedule" id="schedule">
                <h2>
                    Check Out  <span></span>
                </h2>
                <Icon />
                <Container>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="checkin_id">User ID:</label>
                        <input
                            type="text"
                            id="checkin_id"
                            value={checkin_id}
                            onChange={(e) => setCheckin_id(e.target.value)}
                        />
                        <button type="submit">Check Out</button>
                    </form>
                </Container>
            </section>

        </div >
    );
};

const styles = css`
  width: 100%;
  padding: 120px 0;
  min-height: 50vh;
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

export default CheckOut;