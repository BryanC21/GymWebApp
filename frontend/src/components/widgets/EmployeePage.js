import ListClasses from "./ListClasses";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddClasses from "./AddClasses";
import React from "react";
import RegisterMember from "./RegisterMember";
import GymAnalytics from "./GymAnalytics";
import EmployeeHeader from "../Header/EmployeeHeader";
import ListActivities from "./ListActivities";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";

const EmployeePage = () => {

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
    }, [info, navigate, user]);

    return (
        <div>
            <EmployeeHeader />
            <h1 className="text-center">Employee Page</h1>
            <div className="container-flex">
                <ListClasses />
                <AddClasses />
                <RegisterMember />
                <GymAnalytics gymId={1} > </GymAnalytics>
                <ListActivities />
                <CheckIn />
                <CheckOut />
            </div>
        </div>
    );
};

export default EmployeePage;