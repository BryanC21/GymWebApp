import { useEffect } from "react";
import HomePage from "..";

import {Link} from 'react-router-dom'

const Home = () => {

    useEffect(() => {
        console.log("Home page");
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <br />
            <Link to="/Employee">Employee Page</Link>
            <br />
            <br />
            <br />
            <HomePage />
        </div>
    );
}

export default Home;