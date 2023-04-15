import ListClasses from "./ListClasses";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AddClasses from "./AddClasses";
import React from "react";

const EmployeePage = () => {

    const info = useSelector(state => state.userState);
    const navigate = useNavigate();

    useEffect(() => {
        /*if (info.userid === 0 || info.userid === undefined) {
            alert("Please login first");
            navigate("/Home");
        }*/
        console.log("THIS: ", info);
    }, [info, navigate]);

    return (
        <div>
            <h1 className="text-center">Employee Page</h1>
            <ListClasses />
            <AddClasses />
        </div>
    );
};

export default EmployeePage;