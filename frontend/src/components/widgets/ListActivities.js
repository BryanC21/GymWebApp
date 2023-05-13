/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import axios from "axios";

import Icon from "../Template/GlobalComponents/Icon";
import scheduleBg from "../Template/Image/scheduleBg.jpg";
import Container from "../Template/GlobalComponents/Container";


const ListActivities = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
        axios.get(urlPath + '/api/activity/getAllActivity')
            .then(res => {
                console.log(res.data.results);
                setClasses(res.data.results);
            })
            .catch(err => {
                console.log(err);
            })


    }, []);

    return (
        <div className="list-activities">

            <section css={styles} className="schedule" id="schedule">
                <h2>
                    List of activities  <span></span>
                </h2>
                <Icon />
                <Container>
                    <div>
                        {classes.length > 0 ? (

                            <div className="row">
                                {classes.map(activity => {
                                    return (
                                        <div className="col-md-4" key={activity.id}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{activity.name}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                            : (
                                <div>
                                    <p>No activities found</p>
                                </div>

                            )
                        }

                    </div>
                </Container>
            </section>

        </div >


    );
}

const styles = css`
  width: 100%;
  padding: 120px 0;
  min-height: 100vh;
  text-align: center;
  background: url('${scheduleBg}') no-repeat center/cover;
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
  @media(max-width: 640px) {
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

export default ListActivities;
