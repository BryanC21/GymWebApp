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
                console.log("GYM INFO: " + JSON.stringify(res.data.results));
                setGymInfo(res.data.results);
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
                console.log("Class count: " + JSON.stringify(res.data.results));
                setClassCount(res.data.results);
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
                console.log("Enroll count: " + JSON.stringify(res.data.results));
                setEnrollCount(res.data.results);
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
                console.log("Member count per hour: " + JSON.stringify(res.data.results));
                setMemberCount(res.data.results);

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
                console.log("Hours count: " + JSON.stringify(res.data.results));
                setHoursCount(res.data.results);
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
            <div>
                <p>Location id: {gymInfo?.location_id}</p>
                <p>Address: {gymInfo?.address}</p>
                <p>City: {gymInfo?.city}</p>
                <p>State: {gymInfo?.state}</p>
                <p>Country: {gymInfo?.country}</p>
            </div>
            <h2>Class Count</h2>
            <p>Error in backend!</p>
            <div>
                {classCount?.map((item, index) => (
                    <p key={index}>Time: {item.time} Count: {item.count}</p>
                ))}
            </div>
            <h2>Enroll Count</h2>
            <div>
                {enrollCount?.map((item, index) => (
                    <p key={index}>Time: {item.time} Count: {item.count}</p>
                ))}
            </div>
            <h2>Member Count Per Hour</h2>
            <div>
                {memberCount?.map((item, index) => (
                    <p key={index}>Time: {item.time} Count: {item.count} checkin hour: {item.checkin_hour}</p>
                ))}
            </div>
            <h2>Hours Count</h2>
            <div>
                {hoursCount?.map((item, index) => (
                    <p key={index}>Time: {item.time} Count: {item.count}</p>
                ))}
            </div>


        </div>
    );
};

export default GymAnalytics;