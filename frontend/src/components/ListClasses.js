import { useState, useEffect } from "react";
import axios from "axios";

const ListClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            let urlPath = process.env.REACT_APP_API_URL || 'http://localhost:5002';
            await axios.get(urlPath + '/api/class/getAllClasses')
                .then(res => {
                    console.log(res.data.results);
                    setClasses(res.data.results);
                    setLoading(false);
                })
                .catch(err =>
                    setLoading(false) &&
                    alert("Error: " + err.message) &&
                    console.log(err));
        };
        fetchClasses();
    }, []);

    return (
        <div>
            {classes.length > 0 ? (
                <ul>
                    {classes.map((item) => {
                        return <li key={item.id}> {item.activity_name} - {item.start_time}</li>
                    })}
                </ul>
            ) : (
                <div>
                    <p>loading...</p>
                </div>
            )
            }
        </div>
    );
}

export default ListClasses;