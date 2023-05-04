import { useEffect } from "react";
import HomePage from "..";

import {Link} from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";




const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Home page");
        //dispatch(setUser("a new one"));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <br />
            <Link to="/Employee">Employee Page</Link>
            <br />
            <Link to="/Login">Login</Link>
            <br />
            <Link to="/Member">Member Page</Link>
            <br />
            <br />
            <br />
            <HomePage />
        </div>
    );
}

export default Home;