import { useEffect } from "react";
import Header from "../Header/Header";

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";

import Main from "../Template/Main/Main";
import GymProgram from "../Template/GymProgram/GymProgram";
import Member from "../Template/Member/Member";
import Classes from "../Template/OurClasses/Classes";
import Schedule from "../Template/Schedule/Schedule";
import Contact from "../Template/Contact/Contact";
import Trainers from "../Template/Trainers/Trainers"

import GymInfo from "./GymInfo";




const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Home page");
        //dispatch(setUser("a new one"));
    }, []);

    return (
        <div>
            <Main />
            <Classes />
            <Schedule />
            <Trainers />
            {/* <GymInfo /> */}
            {/* <Contact /> */}
        </div>
    );
}

export default Home;