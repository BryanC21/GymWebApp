import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../Header/Header';

const GymInfo = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(urlPath + '/api/class/getAllGyms')
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
            <Header />

            {classes.length > 0 ? (

                <table>
                    <thead>
                        <tr>
                            <th>Gym ID</th>
                            <th>Gym Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => {
                            return <tr key={item.id}>
                                <td> {item.id}</td>
                                <td> {item.address}</td>
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
