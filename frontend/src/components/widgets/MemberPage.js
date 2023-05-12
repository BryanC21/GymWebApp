import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

import '../../styles/MemberPage.css'

import MemberHeader from "../Header/MemberHeader";

import Main_Member from "../Template/Main/Main_Member";
import GymProgram from "../Template/GymProgram/GymProgram";
import Member from "../Template/Member/Member";
import Classes from "../Template/OurClasses/Classes";
import Schedule from "../Template/Schedule/Schedule";
import Trainers from "../Template/Trainers/Trainers";
import Contact from '../Template/Contact/Contact';

const MemberPage = () => {
  const info = useSelector((state) => state.userState);
  const user = useSelector((state) => state.userDetailsState);
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
    <div className="MemberPage">

    <Main_Member />
      {/* <MemberHeader /> */}

      {/* Use IDs in the hrefs to connect with the corresponding sections */}
      {/* <section id="current-class">
        <ShowCurrentClass />
      </section>

      <section id="log-hours">
        <LogHours />
      </section>

      <section id="enroll-class">
        <EnrollClass />
      </section>

      <section id="past-activity">
        <PastActivity /> 
      </section>*/}
    </div>
  );
};

export default MemberPage;
