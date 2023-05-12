// a react form that acccpets an id and deletes the class with that id

import React, { useState } from 'react';
import axios from 'axios';


const DeleteClass = () => {

    const [id, setId] = useState('');

    let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const deleteClass = () => {
        //TODO delete class
    }

    return (
        <div>
            <h1>Delete Class</h1>
            <input type="text" onChange={(e) => setId(e.target.value)} />
            <button onClick={deleteClass}>Delete</button>
        </div>
    )
}
