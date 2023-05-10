import React, { useState } from 'react';
import '../../styles/AddClasses.css';
import axios from 'axios';
import MemberHeader from '../Header/MemberHeader';

const EnrollClass = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const [class_id, setClass_id] = useState('1');
    const [user_id, setUser_id] = useState('1');

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFail(false);
        setSuccess(false);
        const newClass = {
            'class_id': class_id,
            'user_id': user_id
        };
        console.log(newClass);

        axios.get(baseURL + '/api/class/enrollClass', { params: newClass })
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

            <h1 className='text-center'>Enroll Classes</h1>
            <form className='form-container'>

                <label className='form-label'>Employee ID</label>
                <input className='form-input' type="text" value={class_id} onChange={(e) => setClass_id(e.target.value)} />

                <label className='form-label'>Gym ID</label>
                <input className='form-input' type="text" value={user_id} onChange={(e) => setUser_id(e.target.value)} />

                <button className='form-submit form-hover' type="submit" onClick={handleSubmit} >Enroll Class</button>

                {success ? <h1 style={{ color: 'white', marginTop: '20px', backgroundColor: 'green', borderRadius: '10px', padding: '10px' }}> Class added succesfully! </h1> : null}
                {fail ? <h1 style={{ color: 'white', marginTop: '20px', backgroundColor: 'red', borderRadius: '10px', padding: '10px' }}> Class failed to add! </h1> : null}

            </form>

        </div >
    );
}

export default EnrollClass;
