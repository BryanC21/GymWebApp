import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EnrollClass from "./EnrollClass";
import React from "react";
import LogHours from "./LogHours";
import PastActivity from "./PastActivity.js";
import ShowCurrentClass from "./ShowCurrentClass";

import MemberHeader from "../Header/MemberHeader";

const MemberPage = () => {
  const info = useSelector((state) => state.userState);
  const user = useSelector((state) => state.userDetailsState);
  const navigate = useNavigate();

  useEffect(() => {
  }, [info, navigate]);

  return (
    <div>
      <MemberHeader />
      <h1>{user.userDetails.first_name} {user.userDetails.last_name}</h1>
      <p>Gender: {user.userDetails.gender}</p>
      <p>Phone: {user.userDetails.phone}</p>
      <p>Email: {user.userDetails.email}</p>
    </div>
  );
};

export default MemberPage;
