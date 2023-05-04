/*
activity_id: the id of the activity
employee_id: the id of the employee
gym_id: the id of the gym
start_time: the start time of the class
duration: the duration time of the class
capacity: the capacity time of the class
*/
import React, { useState } from 'react';
import '../../styles/AddActivity.css';
import axios from 'axios';

const AddActivity = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const [employee_id, setEmployee_id] = useState('1'); //TODO: grab from session ?
    const [gym_id, setGym_id] = useState('1');
    const [activity_id, setActivity_id] = useState('1'); //TODO ???????
    const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
    const [start_time, setStart_time] = useState('09:00:00');
    const [duration, setDuration] = useState('90');
    const [capacity, setCapacity] = useState('35');

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFail(false);
        setSuccess(false);
        let trueDate = day + ' ' + start_time;
        const newClass = {
            'employee_id': employee_id,
            'gym_id': gym_id,
            'activity_id': activity_id,
            'start_time': trueDate,
            'duration': duration,
            'capacity': capacity
        };
        console.log(newClass);

        axios.get(baseURL + '/api/class/addClass', { params: newClass })
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
            <h1 className='text-center'>Add Classes</h1>
            <form className='form-container'>

                <label className='form-label'>Employee ID</label>
                <input className='form-input' type="text" value={employee_id} onChange={(e) => setEmployee_id(e.target.value)} />

                <label className='form-label'>Gym ID</label>
                <input className='form-input' type="text" value={gym_id} onChange={(e) => setGym_id(e.target.value)} />

                <label className='form-label'>Activity ID</label>
                <input className='form-input' type="text" value={activity_id} onChange={(e) => setActivity_id(e.target.value)} />

                <label className='form-label'>Day</label>
                <input className='form-input' type="date" value={day} onChange={(e) => setDay(e.target.value)} />

                <label className='form-label'>Start Time</label>
                <input className='form-input' type="time" value={start_time} onChange={(e) => setStart_time(e.target.value)} />

                <label className='form-label'>Duration(minutes)</label>
                <input className='form-input' type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />

                <label className='form-label'>Capacity</label>
                <input className='form-input' type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} />

                <button className='form-submit form-hover' type="submit" onClick={handleSubmit} >Add Class</button>

                {success ? <h1 style={{ color: 'white', marginTop: '20px', backgroundColor: 'green', borderRadius: '10px', padding: '10px' }}> Class added succesfully! </h1> : null}
                {fail ? <h1 style={{ color: 'white', marginTop: '20px', backgroundColor: 'red', borderRadius: '10px', padding: '10px' }}> Class failed to add! </h1> : null}

            </form>

        </div >
    );
}

export default AddActivity;
