/*
activity_id: the id of the activity
employee_id: the id of the employee
gym_id: the id of the gym
start_time: the start time of the class
duration: the duration time of the class
capacity: the capacity time of the class
*/
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState } from 'react';
import axios from 'axios';

import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";

const AddClasses = () => {

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
    <div className='add-classes'>
      <section css={styles} className="trainers" id="trainers">
        <h2>
          <span>Add Classes</span>
        </h2>
        <Icon />
        <Container>
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

export default AddClasses;
