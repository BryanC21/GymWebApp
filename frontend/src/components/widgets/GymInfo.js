import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const GymInfo = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(urlPath + '/api/gym/getAllGyms')
            .then(res => {
                console.log(res.data.results);
                setClasses(res.data.results);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="">

            {classes.length > 0 ? (

                <table>
                    <thead>
                        <tr>
                            <th>Gym Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => {
                            return <tr key={item.id}>
                                <td><a href={"/gymDetail?gym_id="+item.id}>{item.address}, {item.city}, {item.state}</a></td>
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
    );
}

export default GymInfo;
