import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../Header/Header';
import Container from 'react-bootstrap/Container';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const GymDetail = () => {
    const [gym, setGym] = useState({});
    const [classes, setClasses] = useState([]);
    const [view, setView] = useState("list");
    const queryParameters = new URLSearchParams(window.location.search)
    const gym_id = queryParameters.get("gym_id")

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(urlPath + '/api/gym/getGymById', { params: { gym_id: gym_id } })
            .then(res => {
                console.log(res.data.results);
                setGym(res.data.results);
            })
            .catch(err => {
                console.log(err);
            })
        axios.get(urlPath + '/api/class/getClassesByGym', { params: { gym_id: gym_id } })
            .then(res => {
                console.log(res.data.results);
                setClasses(res.data.results);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function format(classList) {
        let eventList = [];
        classList.forEach(classobj => {
            let event = {
                id: classobj.id,
                title: classobj.activity_name + " " + classobj.duration + " minutes",
                start: classobj.start_time.replace(".000Z", ""),
                end: new Date(new Date(classobj.start_time).getTime() + classobj.duration * 60000).toISOString().replace(".000Z", ""),
            };
            eventList.push(event);
        });
        return eventList;
    }

    return (
        <div className="">
            <Header />
            <h2 className="text-center">Gym</h2>
            <p>{gym.address}, {gym.city}, {gym.state}</p>

            <button onClick={() => setView("list")}>List View</button>
            <button onClick={() => setView("calendar")}>Calendar View</button>

            <h2 className="text-center">Available Classes</h2>
            {view == "list" ? (
                <div>
                    {classes.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Class ID</th>
                                    <th>Activity Name</th>
                                    <th>Available Spots</th>
                                    <th>Duration</th>
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
            )
                :
                <Container>
                    <div className="App">
                        <FullCalendar
                            defaultView="dayGridMonth"
                            header={{
                                left: "prev,next",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay"
                            }}
                            themeSystem="Simplex"
                            plugins={[dayGridPlugin]}
                            events={format(classes)}
                        />
                    </div>
                </Container>
            }
        </div>
    );
}

export default GymDetail;
