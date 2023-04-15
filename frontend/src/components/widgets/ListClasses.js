import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ListClasses.css"

const ListClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(urlPath + '/api/class/getAllClasses')
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
            <h2 className="text-center">List of Classes</h2>

            {classes.length > 0 ? (

                <table>
                    <thead>
                        <tr>
                            <th>Activity Name</th>
                            <th>Capacity</th>
                            <th>Duration</th>
                            <th>Employee Name</th>
                            <th>Gym Address</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => {
                            return <tr key={item.id}>
                                <td> {item.activity_name}</td>
                                <td> {item.capacity}</td>
                                <td> {item.duration}</td>
                                <td> {item.employee_first_name + " " + item.employee_last_name}</td>
                                <td> {item.gym_address}</td>
                                <td> {item.start_time.slice(0, 10) + " " + item.start_time.slice(11, 16)}</td>
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

export default ListClasses;
