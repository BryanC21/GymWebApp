import React, { useState, useEffect } from 'react';
import '../../styles/AddClasses.css';
import axios from 'axios';
import MemberHeader from '../Header/MemberHeader';
import { useSelector } from "react-redux";

const EnrollClass = () => {
    const [classes, setClasses] = useState([]);
    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(urlPath + '/api/class/getAllClassesExceptUserId', 
            {params: {'user_id': user.userDetails.id, 'token': info.user}})
            .then(res => {
                console.log(res.data.results);
                setClasses(res.data.results);
            })
            .catch(err => {
                console.log(err);
            })


    }, []);

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const handleSubmit = (class_id) => {
        setFail(false);
        setSuccess(false);
        const newClass = {
            'class_id': class_id,
            'user_id': user.userDetails.id,
            'token': info.user
        };

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
            <div className="">
            <h2 className="text-center">List of Classes</h2>

            {classes.length > 0 ? (

                <table>
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>Activity Name</th>
                            <th>Capacity</th>
                            <th>Duration(mins)</th>
                            <th>Gym Address</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => {
                            return <tr key={item.id}>
                                <td> {item.id}</td>
                                <td> {item.activity_name}</td>
                                <td> {item.capacity}/{item.full_capacity}</td>
                                <td> {item.duration}</td>
                                <td> {item.address}</td>
                                <td> {item.start_time.slice(0, 10) + " " + item.start_time.slice(11, 16)}</td>
                                <td> <button onClick={() => handleSubmit(item.id)}>Enroll</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>

            ) : (
                <div>
                    <p>No classes found</p>
                </div>

            )
            }


        </div>


        

        </div >
    );
}

export default EnrollClass;
