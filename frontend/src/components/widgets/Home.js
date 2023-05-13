import { useEffect } from "react";
import Header from "../Header/Header";

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";

import Main from "../Template/Main/Main";
import Classes from "../Template/OurClasses/Classes";
import Schedule from "../Template/Schedule/Schedule";
import Trainers from "../Template/Trainers/Trainers"
import ListClassesSimple from "./ListClassesSimple";




const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Home page");
        //dispatch(setUser("a new one"));
    }, []);

    return (
        <div>
            <Main />
            {/*
            <Classes />
            <Schedule />*/}
            <ListClassesSimple />
            <Trainers />
        </div>
    );
}

export default Home;