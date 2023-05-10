import React, { useState } from 'react';
import '../../styles/LogHours.css';
import axios from 'axios';
import MemberHeader from '../Header/MemberHeader';

const PastActivity = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const [activity_days, getActivityByDays] = useState('1');
    const [day, setDay] = useState(new Date().toISOString().slice(0, 10));

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFail(false);
        setSuccess(false);

        axios.get(baseURL + '/api/class/addClass', { params: activity_days })
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
           
            <h1 className='text-center'>Check Past Activity</h1>
            <form className='form-container'>

                <label className='form-label'>Day</label>
                <input className='form-input' type="date" value={day} onChange={(e) => setDay(e.target.value)} />

                <button className='form-submit form-hover' type="submit" onClick={handleSubmit} >Check Activity</button>

                {success ? <h1 style={{ color: 'white', marginTop: '20px', backgroundColor: 'green', borderRadius: '10px', padding: '10px' }}>  </h1> : null}
                {fail ? <h1 style={{ color: 'white', marginTop: '20px', backgroundColor: 'red', borderRadius: '10px', padding: '10px' }}> No Activity Found </h1> : null}

            </form>

        </div >
    );
}

export default PastActivity;
