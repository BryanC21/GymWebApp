/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Icon from "../Template/GlobalComponents/Icon";
import scheduleBg from "../Template/Image/scheduleBg.jpg";
import Container from "../Template/GlobalComponents/Container";


/*
results": [
{
"time": "2023-03-06T08:00:00.000Z",
"count": 4
},
{
"time": "2023-05-01T07:00:00.000Z",
"count": 4
}
]
 */


const GymAnalytics = ({ gymId }) => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    let [gymInfo, setGymInfo] = useState(null);
    let [classCount, setClassCount] = useState(null);
    let [enrollCount, setEnrollCount] = useState(null);
    let [memberCount, setMemberCount] = useState(null);
    let [hoursCount, setHoursCount] = useState(null);

    //TODO set the data in UI
    useEffect(() => {
        const getGymAnalytics = async () => {
            try {
                const res = await axios.get(baseURL + '/api/gym/getGymById', {
                    params: {
                        gym_id: gymId,
                    }
                });
                console.log("GYM INFO: " + JSON.stringify(res.data.results));
                setGymInfo(res.data.results);
            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getClassCountByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "week"
                    }
                });
                console.log("Class count: " + JSON.stringify(res.data.results));
                setClassCount(res.data.results);
            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getEnrollCountByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "week"
                    }
                });
                console.log("Enroll count: " + JSON.stringify(res.data.results));
                setEnrollCount(res.data.results);
            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getMemberCountPerHourByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "weekday"
                    }
                });
                console.log("Member count per hour: " + JSON.stringify(res.data.results));
                setMemberCount(res.data.results);

            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getHoursCountByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "week"
                    }
                });
                console.log("Hours count: " + JSON.stringify(res.data.results));
                setHoursCount(res.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        getGymAnalytics();
    }, [gymId, baseURL]);

    return (
        <div className='analytics'>

            <div>
                <section css={styles} className="schedule" id="schedule">
                    <h2>
                        Gym Analytics  <span></span>
                    </h2>
                    <Icon />
                    <Container>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={"2"}>
                                        <h2 style={{ color: 'black' }}>Gyms</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={"2"}>
                                        <div>
                                            <p>Location id: {gymInfo?.location_id}</p>
                                            <p>Address: {gymInfo?.address}</p>
                                            <p>City: {gymInfo?.city}</p>
                                            <p>State: {gymInfo?.state}</p>
                                            <p>Country: {gymInfo?.country}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2 style={{ color: 'black' }}>Class Count</h2>
                                    </td>
                                    <td>
                                        <h2 style={{ color: 'black' }}>Enroll Count</h2>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>Error in backend!</p>
                                        <div>
                                            {classCount?.map((item, index) => (
                                                <p key={index}>Time: {item.time} Count: {item.count}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {enrollCount?.map((item, index) => (
                                                <p key={index}>Time: {item.time} Count: {item.count}</p>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <h2 style={{ color: 'black' }}>Member Count Per Hour</h2>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <h2 style={{ color: 'black' }}>Hours Count</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div>
                                            {memberCount?.map((item, index) => (
                                                <p key={index}>Time: {item.time} Count: {item.count} checkin hour: {item.checkin_hour}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div>
                                            {hoursCount?.map((item, index) => (
                                                <p key={index}>Time: {item.time} Count: {item.count}</p>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </section>

            </div >
        </div>
    );
};

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

export default GymAnalytics;