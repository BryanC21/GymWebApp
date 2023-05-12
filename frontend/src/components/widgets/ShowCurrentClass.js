/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../styles/ListClasses.css"
import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";
import Nav_Member from "../Template/Navbar/Nav_Member";


const ShowCurrentClass = () => {
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

    return (
        <div className="">

            <Nav_Member />

            <section css={styles} className="schedule" id="schedule">
                <h2>
                    Class Scedule  <span></span>
                </h2>
                <Icon />
                <Container>
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
                </Container>
            </section>

        </div >

    );
}

const styles = css`
width: 100%;
max-width: 900px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 2;
text-align: center;
color: #fff;
  h2 {
    color: #fff;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 1.3px;
    line-height: 1;
    span {
      color: #ed563b;
    }
  }
  p {
    color: #fff;
    font-size: 16px;
    line-height: 1.7;
    margin: 20px 0;
  }
  .container{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  @media(max-width: 1000px) {
    p{
      padding: 0 30px;
      br{
        display: none;
      }
    }
    .container{
      max-width: 92%;
    }
  }
`;

export default ShowCurrentClass;
