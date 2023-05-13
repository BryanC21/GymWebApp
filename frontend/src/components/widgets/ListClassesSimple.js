/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";
import Nav_Employee from "../Template/Navbar/Nav_Employee";

const ListClassesSimple = () => {
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
        <div className="list-classes">

            <section css={styles} className="schedule" id="schedule">
                <h2 style={{color: 'black', width: '100%'}}>
                    Class Schedule  <span></span>
                </h2>
                <Icon />
                <Container>
                    {classes.length > 0 ? (

                        <table style={{color: 'black', width: '100%'}}>
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
                                    return <tr key={item.id} style={{ color: 'black' }}>
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

        </div>
    );
}

const styles = css`
width: 100%;
max-width: 900px;
position: relative;
left: 50%;
transform: translate(-50%, 50%);
z-index: 2;
text-align: center;
margin-bottom: 150px;
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

export default ListClassesSimple;
