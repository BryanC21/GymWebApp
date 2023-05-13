import React from 'react'
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import axios from "axios";
import Icon from "../Template/GlobalComponents/Icon";
import Container from "../Template/GlobalComponents/Container";


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
        <div className="list-classes">
            
            <section css={styles} className="schedule" id="schedule">
            <Container>

            <h1 className= "text-white text-center">Locations</h1>

            {classes.length > 0 ? (

                <table style={{color: 'white'}}>
                    <thead>
                        <tr>
                            <th>Gym Address</th>
                            <th>Gym ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => {
                            return <tr key={item.id}>
                                <td><a href={"/gymDetail?gym_id="+item.id}>{item.address}, {item.city}, {item.state}</a></td>
                                <td>{item.id}</td>
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

export default GymInfo;
