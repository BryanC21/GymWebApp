import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const CreateActivity = () => {
    const [name, setName] = useState('');
    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';


    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform the necessary actions for creating an activity
        axios.get(baseURL + '/api/class/addActivity', { params: { 'activity_name': name } })
            .then(res => {
                console.log(res);
                alert('Activity created successfully');
                //window.location.replace('/employee#list-activities');
            })
            .catch(err => {
                console.log(err);
                alert('Activity creation failed');
            })
        console.log(name);
    };

    return (
        <div className='create-activity bg-dark text-white'>
            <br />
            <div className=" text-center justify-content-center row">
                <h2>Create Activity</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group w-50 mx-auto row'>
                        <label htmlFor='activityName'>Activity Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='activityName'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <button className='' type='submit'>
                        Create
                    </button>
                </form>
            </div>
            <br />
        </div>
    );
};

export default CreateActivity;
