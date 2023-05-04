import React, { useEffect, useState } from 'react';
import axios from 'axios';

/*
results": [
{
"time": "2023-03-06T08:00:00.000Z",
"count": 4
},
{
"time": "2023-05-01T07:00:00.000Z",
"count": 4
}
]
 */


const GymAnalytics = ({ gymId }) => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    let [gymInfo, setGymInfo] = useState(null);
    let [classCount, setClassCount] = useState(null);
    let [enrollCount, setEnrollCount] = useState(null);
    let [memberCount, setMemberCount] = useState(null);
    let [hoursCount, setHoursCount] = useState(null);

    //TODO set the data in UI
    useEffect(() => {
        const getGymAnalytics = async () => {
            try {
                const res = await axios.get(baseURL + '/api/gym/getGymById', {
                    params: {
                        gym_id: gymId,
                    }
                });
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getClassCountByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "week"
                    }
                });
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getEnrollCountByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "week"
                    }
                });
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getMemberCountPerHourByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "weekday"
                    }
                });
                console.log(res.data);

            } catch (error) {
                console.error(error);
            }
            try {
                const res = await axios.get(baseURL + '/api/admin/getHoursCountByGymId', {
                    params: {
                        gym_id: gymId,
                        interval: "week"
                    }
                });
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getGymAnalytics();
    }, [gymId, baseURL]);

    return (
        <div>
            <h1>Gym Analytics</h1>
            <h2>Gyms</h2>
        </div>
    );
};

export default GymAnalytics;