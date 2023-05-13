/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import ListClasses from "./ListClasses";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddClasses from "./AddClasses";
import React, { useState } from "react";
import RegisterMember from "./RegisterMember";
import RegisterMemberTrial from "./RegisterMemberTrial";
import GymAnalytics from "./GymAnalytics";
import ListActivities from "./ListActivities";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import Main_Employee from "../Template/Main/Main_Employee";
import Container from "../Template/GlobalComponents/Container";

import GymInfo from "./GymInfo";
import { Dropdown } from "bootstrap";
import CreateActivity from "./CreateActivity";
import ListEmployees from "./ListEmployees";
import ListMembers from "./ListMembers";

const EmployeePage = () => {

    const info = useSelector(state => state.userState);
    const user = useSelector(state => state.userDetailsState);
    const dispatch = useDispatch();
    const [isEmployee, setIsEmployee] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (info.user !== null && user.userDetails !== null) {
            if (user.userDetails.level_id === 1 || user.userDetails.level_id === 2) {
              setIsEmployee(true);
            } else {
                alert("ACCESS DENIED: Not signed in as employee!");
                navigate("/");
            }
          } else {
            alert("ACCESS DENIED: Not signed in as employee!");
            navigate("/");
          }
    }, [info, navigate, user, isEmployee]);

    return (
        <div className="employee">

            <Main_Employee />

            <div className="container-flex">

                <section id="list-classes">
                    <ListClasses />
                </section>

                <section id="check-in">
                    <CheckIn />
                </section>
                <section id="check-out">
                    <CheckOut />
                </section>
                <section id="register">
                    <RegisterMemberTrial />
                </section>
                <section id="register">
                    <RegisterMember />
                </section>
                <section id="analytics">

                    <GymAnalytics gymId={1} > </GymAnalytics>
                </section>
                <section id="list-activities">
                    <ListActivities />
                    <CreateActivity />
                </section>
                <section id="add-classes">
                    <AddClasses />
                </section>
                <section id="add-classes">
                    <ListEmployees />
                </section>
                <section id="add-classes">
                    <ListMembers />
                </section>
            </div>
        </div>
    );
};


export default EmployeePage;