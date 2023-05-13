import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React,  { useState } from "react";

import ShowCurrentClass from "./ShowCurrentClass";
import LogHours from "./LogHours";
import EnrollClass from "./EnrollClass";
import PastActivity from "./PastActivity";

import Main_Member from "../Template/Main/Main_Member";

const MemberPage = () => {
  const info = useSelector((state) => state.userState);
  const user = useSelector((state) => state.userDetailsState);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isMember, setIsMember] = useState(false);


  useEffect(() => {
    
    console.log("TOKEN: ", info);
    console.log("USER: ", user.userDetails);

    if (info.user !== null && user.userDetails !== null) {
      if (user.userDetails.level_id === 3 || user.userDetails.level_id === 4) {
        setIsMember(true);
      } else {
        alert("ACCESS DENIED: Not a member!");
        navigate("/");
      }
    } else {
      alert("ACCESS DENIED: Not signed in as member!");
      navigate("/");
    }
    
  }, [info, navigate, user, isMember]);

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
