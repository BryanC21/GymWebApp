import React, { useState } from 'react';
import axios from 'axios';

const CheckIn = () => {
    const [userId, setUserId] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const checkInUser = async (userId, employeeId) => {
        try {
            const res = await axios.post('/api/user/checkinUser', {
                user_id: userId,
                employee_id: employeeId,
            });
            //TODO save checkout id but where?
            console.log(res);
            alert('User checked in successfully');

        } catch (error) {
            console.error(error);
            alert('Error checking in user');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkInUser(userId, employeeId);
    };

    return (
        <div>
            <h2>Check In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userId">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <label htmlFor="employeeId">Employee ID:</label>
                <input
                    type="text"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
                <button type="submit">Check In</button>
            </form>
        </div>
    );
};

export default CheckIn;