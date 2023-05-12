/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import '../../styles/LogHours.css';
import axios from 'axios';

import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";


const PastActivity = () => {

  let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

  const info = useSelector(state => state.userState);
  const user = useSelector(state => state.userDetailsState);

  const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
  const [activityList, setActivityList] = useState([]);

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  useEffect(() => {
    handleGetLog("week");
  }, []);

  const handleGetLog = (interval) => {
    let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    axios.get(urlPath + '/api/activity/getActivityByInterval',
      { params: { 'user_id': user.userDetails.id, 'interval': interval, 'token': info.user } })
      .then(res => {
        setActivityList(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (

    <div className="">

      <div>
        <section css={styles} className="trainers" id="trainers">
          <h2>
            <span>Past Activity</span>
          </h2>
          <Icon />
          <p>
            Nunc urna sem, laoreet ut metus id, aliquet consequat magna. Sed viverra{" "}
            <br />
            ipsum dolor, ultricies fermentum massa consequat eu.
          </p>
          <Container>

            <table>
              <tbody>
                <tr>
                  <td style={{ width: '300px' }}>
                    <button onClick={() => handleGetLog("week")}>Past Week</button>
                  </td>
                  <td style={{ width: '300px' }}>
                    <button onClick={() => handleGetLog("month")}>Past Month</button>
                  </td>
                  <td style={{ width: '300px' }}>
                    <button onClick={() => handleGetLog("quarter")}>Last 90 Days</button>
                  </td>
                </tr>
                <tr>
                  <br />
                  <br />
                  <br />

                </tr>
                <tr>
                  <td colspan="3">
                    {console.log(activityList)}
                    {activityList.length > 0 ? (

                      <table>
                        <thead>
                          <tr>
                            <th>Class ID</th>
                            <th>Activity Name</th>
                            <th>Duration(Minutes)</th>
                            <th>Start Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activityList.map((item) => {
                            return <tr key={item.id}>
                              <td> {item.log_id}</td>
                              <td> {item.activity_name}</td>
                              <td> {item.duration}</td>
                              <td> {item.create_time.slice(0, 10) + " " + item.create_time.slice(11, 16)}</td>
                            </tr>
                          })}
                        </tbody>
                      </table>

                    ) : (
                      <div>
                        <p>No Activities found</p>
                      </div>

                    )
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </Container>
        </section>
      </div>
    </div >
  );
}


const styles = css`
  width: 100%;
  padding: 120px 0;
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
    justify-content: space-between;
    align-items: center;
    padding: 50px 0 0 0;
  }
  .button {
    margin-left :5px 
  }

  @media (max-width: 650px) {
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

export default PastActivity;
