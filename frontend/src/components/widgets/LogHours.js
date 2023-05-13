/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import '../../styles/LogHours.css';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";

const LogHours = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);
    const [activityId, setActivityId] = useState("Activity");
    const [activityName, setActivityName] = useState("Activity");
    const [activityList, setActivityList] = useState([]);
    const [duration, setDuration] = useState(1);

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';

        axios.get(urlPath + '/api/activity/getAllActivity',
            { params: { 'token': info.user } })
            .then(res => {
                let list = res.data.results;
                if (list.length) {
                    setActivityName(list[0].name);
                    setActivityId(list[0].id);
                }
                setActivityList(list);
            })
            .catch(err => {
                console.log(err);
            })


    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setFail(false);
        setSuccess(false);

        axios.get(baseURL + '/api/user/logHours',
            {
                params: {
                    user_id: user.userDetails.id, activity_id: activityId,
                    duration: duration, token: info.user
                }
            })
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => {
                console.log(err);
                setFail(true);
            })

    }


    return (
        <div className="log-hours">
            <section css={styles} className="trainers" id="trainers">
                <h2>
                    <span>Log Hours</span>
                </h2>
                <Icon />
                <Container>
                    <h3>
                        <form>
                            <table style={{ backgroundColor: "white", border: '0' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label> Activity Type </label>
                                        </td>
                                        <td>
                                            <label> Minutes </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    {activityName}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {activityList.map((item) => {
                                                        return <Dropdown.Item onClick={() => { setActivityName(item.name); setActivityId(item.id); }}>
                                                            {item.name}</Dropdown.Item>
                                                    })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td width="50%">
                                            <input type="number" name="duration" min={0} onChange={e => setDuration(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <button onClick={handleSubmit}> Submit </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </h3>
                </Container>
            </section>
        </div >
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

export default LogHours;
