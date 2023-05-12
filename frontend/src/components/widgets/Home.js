import { useEffect } from "react";
import Header from "../Header/Header";

import {Link} from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";

import Main from "../Template/Main/Main";
import GymProgram from "../Template/GymProgram/GymProgram";
import Member from "../Template/Member/Member";
import Classes from "../Template/OurClasses/Classes";
import Schedule from "../Template/Schedule/Schedule";
import Contact from "../Template/Contact/Contact";
import Trainers from "../Template/Trainers/Trainers"




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
            {/* <Contact />
            <br />
            “Physical fitness is not only one of the most important keys to a healthy body, but it is also the basis of dynamic and creative intellectual activity.” - John F Kennedy

            <br />
            <br />

            <h2>Fithub</h2> (Your one-stop destination for gym management)
            <br />
            Being fit and healthy is an important life skill that requires prior attention and managing a gym club is quite challenging. With a plethora of membership data, class schedules, and member activity data it can be overwhelming to maintain everything in one place. Our innovative project FitHub comes to the rescue
            <br />
            <br />
            The FitHub gym management system is a perfect application for all gym and health clubs. It simplifies the gym management process and upgrades the experience for gym members and employees. In addition to that, the insights can be quite helpful for strategic decision-making.
            <br /> */}
        </div>
    );
}

export default Home;