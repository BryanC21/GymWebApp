import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

import ShowCurrentClass from "./ShowCurrentClass";
import LogHours from "./LogHours";
import EnrollClass from "./EnrollClass";
import PastActivity from "./PastActivity";

import Main_Member from "../Template/Main/Main_Member";

const MemberPage = () => {
  const info = useSelector((state) => state.userState);
  const user = useSelector((state) => state.userDetailsState);
  const navigate = useNavigate();

  useEffect(() => {
  }, [info, navigate]);

  return (
    <div className="MemberPage">

      <Main_Member />

      {/* <Nav_Member /> */}

      {/* Use IDs in the hrefs to connect with the corresponding sections */}
      <section id="current-class">
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
      </section>
    </div>
  );
};

export default MemberPage;
