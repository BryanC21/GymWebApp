import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// import events from "./events";
const ClassSchedule = () => {

    let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

    const [classes, setClasses] = useState([]);
    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);

    const [class_id, setClass_id] = useState('1');
    const [user_id, setUser_id] = useState('1');

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';

        axios.get(urlPath + '/api/class/getClassesByUserId',
            { params: { 'user_id': user.userDetails.id, 'token': info.user } })
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
        <div>
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
        </div>
    );
}

export default ClassSchedule;