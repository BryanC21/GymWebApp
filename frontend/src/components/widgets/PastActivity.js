import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import '../../styles/LogHours.css';
import axios from 'axios';
import MemberHeader from '../Header/MemberHeader';

const PastActivity = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);

    const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
    const [activityList, setActivityList] = useState([]);

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    useEffect(() => {
        handleGetLog("week");
    }, []);

    const handleGetLog = (interval) => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';

        axios.get(urlPath + '/api/activity/getActivityByInterval', 
        {params: {'user_id': user.userDetails.id, 'interval': interval, 'token': info.user}})
        .then(res => {
            setActivityList(res.data.results);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (

        <div className="">
            <MemberHeader />
            <h2 className="text-center">Past Activity</h2>
            <div>
                <button onClick={() => handleGetLog("week")}>Past Week</button>
                <button onClick={() => handleGetLog("month")}>Past Month</button>
                <button onClick={() => handleGetLog("quarter")}>Last 90 Days</button>
            </div>
            {console.log(activityList)}
            {activityList.length > 0 ? (

                <table>
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>Activity Name</th>
                            <th>Duration(Minutes)</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityList.map((item) => {
                            return <tr key={item.id}>
                                <td> {item.log_id}</td>
                                <td> {item.activity_name}</td>
                                <td> {item.duration}</td>
                                <td> {item.create_time.slice(0, 10) + " " + item.create_time.slice(11, 16)}</td>
                            </tr>
                        })}
                    </tbody>
                </table>

            ) : (
                <div>
                    <p>No Activities found</p>
                </div>

            )
            }
        </div>
    );
}

export default PastActivity;
