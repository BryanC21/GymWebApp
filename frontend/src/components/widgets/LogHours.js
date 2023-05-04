/*
activity_id: the id of the activity
employee_id: the id of the employee
gym_id: the id of the gym
start_time: the start time of the class
duration: the duration time of the class
capacity: the capacity time of the class
*/
import React, { useState } from 'react';
import '../../styles/LogHours.css';
import axios from 'axios';

const LogHours = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const [activity_name, setActivity_name] = useState('1');
    const [duration, setDuration] = useState('90');

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFail(false);
        setSuccess(false);

        axios.get(baseURL + '/api/class/addActivity', { params: activity_name })
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
            <h1 className='text-center'>Log Hours</h1>

            <form>
                <label> Activity Type </label>
                <input type="text" name="avtivityName" onChange={e => setActivity_name(e.target.value)} />
                <label> Hours </label>
                <input type="number" name="duration" onChange={e => setDuration(e.target.value)} />
                <button onClick={handleSubmit}> Submit </button>
            </form>

        </div >
    );
}

export default LogHours;
