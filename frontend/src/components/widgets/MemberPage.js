import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import EnrollClass from "./EnrollClass";
import React from "react";
import LogHours from "./LogHours";
import PastActivity from "./PastActivity.js";
import ShowCurrentClass from "./ShowCurrentClass"

const MemberPage = () => {

    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);
    const navigate = useNavigate();

    useEffect(() => {
        /*if (info.userid === 0 || info.userid === undefined) {
            alert("Please login first");
            navigate("/Home");
        }*/
        console.log("TOKEN: ", info);
        console.log("USER: ", user);
    }, [info, navigate]);
    
    return (
        <div>
            <h1 className="text-center">Member Page</h1>
            <ShowCurrentClass /> {/* need work */}
            <LogHours /> {/*need test function */}
            <EnrollClass /> {/*need test function */}
            <PastActivity /> {/*need test function */} 
        </div>
    );


};

export default MemberPage;