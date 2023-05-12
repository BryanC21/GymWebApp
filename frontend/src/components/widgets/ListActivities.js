import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ListClasses.css"

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
        <div className="">
            <h2 className="text-center">List of activities</h2>

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
    );
}

export default ListActivities;
