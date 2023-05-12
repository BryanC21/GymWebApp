/*
activity_id: the id of the activity
employee_id: the id of the employee
gym_id: the id of the gym
start_time: the start time of the class
duration: the duration time of the class
capacity: the capacity time of the class
*/
import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import '../../styles/LogHours.css';
import axios from 'axios';
import MemberHeader from '../Header/MemberHeader';
import Dropdown from 'react-bootstrap/Dropdown';

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
            {params: {'token': info.user}})
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
            { params: { user_id: user.userDetails.id, activity_id: activityId, 
                duration:duration, token: info.user }})
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
        <div>
            <MemberHeader />
            <h1 className='text-center'>Log Hours</h1>

            <form>
                <label> Activity Type </label>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {activityName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        {activityList.map((item) => {
                            return <Dropdown.Item onClick={()=>{setActivityName(item.name);setActivityId(item.id);}}>
                            {item.name}</Dropdown.Item>
                        })}
                        </Dropdown.Menu>
                </Dropdown>
                <label> Minutes </label>
                <input type="number" name="duration" min={0} onChange={e => setDuration(e.target.value)} />
                <button onClick={handleSubmit}> Submit </button>
            </form>

        </div >
    );
}

export default LogHours;
