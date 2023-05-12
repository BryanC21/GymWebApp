import React, { useState } from 'react';
import axios from 'axios';

const CheckOut = () => {
    const [checkin_id, setCheckin_id] = useState('');
    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';


    const checkOutUser = async (someID) => {

        try {
            axios.get(baseURL + '/api/user/getCheckinByUserId', { params: { user_id: someID } })
                .then(response => {
                    axios.get(baseURL + '/api/user/checkoutUser', {
                        params: {
                            checkin_id: response.data.results.id,
                        }
                    }).then(res => {
                        console.log(res);
                        alert('User checked out successfully');
                    }).catch(error => {
                        console.error(error);
                        alert('Error checking out user');
                    }
                    )
                })

                .catch(error => {
                    console.error(error);
                    alert('Error checking out user');
                }
                )

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
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="checkin_id">User ID:</label>
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