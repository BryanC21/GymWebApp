import { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import "../../styles/ListClasses.css"
import MemberHeader from "../Header/MemberHeader";

const ShowCurrentClass = () => {
    const [classes, setClasses] = useState([]);
    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);

    const [class_id, setClass_id] = useState('1');
    const [user_id, setUser_id] = useState('1');

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';

        axios.get(urlPath + '/api/class/getClassesByUserId', 
            {params: {'user_id': user.userDetails.id, 'token': info.user}})
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

            <MemberHeader />

            <h2 className="text-center">Class Scedule</h2>

            {classes.length > 0 ? (

                <table>
                    <thead>
                        <tr>
                            <th>Activity Name</th>
                            <th>Capacity</th>
                            <th>Duration</th>
                            <th>Gym Address</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => {
                            return <tr key={item.id}>
                                <td> {item.activity_name}</td>
                                <td> {item.capacity}/{item.full_capacity}</td>
                                <td> {item.duration}</td>
                                <td> {item.address}</td>
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

export default ShowCurrentClass;
