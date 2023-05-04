import React, { useState } from 'react';
import axios from 'axios';

const CheckOut = () => {
    const [checkin_id, setCheckin_id] = useState('');

    const checkOutUser = async (someID) => {
        try {
            const res = await axios.post('/api/user/checkoutUser', {
                checkin_id: someID,
            });
            console.log(res);
            alert('User checked out successfully');
            
        } catch (error) {
            console.error(error);
            alert('Error checking out user');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkOutUser(checkin_id);
    };

    return (
        <div>
            <h2>Check In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="checkin_id">Checkin ID:</label>
                <input
                    type="text"
                    id="checkin_id"
                    value={checkin_id}
                    onChange={(e) => setCheckin_id(e.target.value)}
                />
                <button type="submit">Check Out</button>
            </form>
        </div>
    );
};

export default CheckOut;