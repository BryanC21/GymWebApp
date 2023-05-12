import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EnrollClass from "./EnrollClass";
import React from "react";
import LogHours from "./LogHours";
import PastActivity from "./PastActivity.js";
import ShowCurrentClass from "./ShowCurrentClass";

import MemberHeader from "../Header/MemberHeader";
import Header from "../Header/Header";

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
    <div>
      <Header />

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
