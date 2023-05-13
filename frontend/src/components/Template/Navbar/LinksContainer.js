/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import Link from "./Link";
import Button from "../GlobalComponents/Button";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../actions/userActions";
import { setUserDetails } from "../../../actions/userActions";

const LinksContainer = ({ hidden }) => {

  const info = useSelector(state => state.userState);
  const user = useSelector(state => state.userDetailsState);
  const dispatch = useDispatch();
  const [isEmployee, setIsEmployee] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    console.log("TOKEN: ", info);
    console.log("USER: ", user.userDetails);

    if (info.user !== null && user.userDetails !== null) {
      if (user.userDetails.level_id === 1 || user.userDetails.level_id === 2) {
        setIsEmployee(true);
        setIsMember(false);
      } else if (user.userDetails.level_id === 3 || user.userDetails.level_id === 4) {
        setIsMember(true);
        setIsEmployee(false);
      }
    }

  }, [info, user]);

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setUserDetails(null));
    window.location.replace("/");
  };


  return (
    <div css={styles} className={(hidden ? "hidden" : "") + " linksContainer"}>
      <Link name="HOME" linkTo="/" />
      {/*<Link name="CLASSES" linkTo="#ourClasses" />*/}
      <Link name="SCHEDULES" linkTo="#schedule" />
      <Link name="ABOUT" linkTo="#trainers" />

      {(!isMember && !isEmployee) &&
        <Link name="MEMBER LOGIN" linkTo="/MemberLogin" />
      }

      {(!isMember && !isEmployee) &&
        <Link name="EMPLOYEE LOGIN" linkTo="/EmployeeLogin" />
      }

      {isMember &&
        <Link name="MEMBER PROFILE" linkTo="/Member" />
      }

      {isEmployee &&
        <Link name="EMPLOYEE PROFILE" linkTo="/Employee" />
      }

      {(isMember || isEmployee) &&
        <div onClick={handleLogout}>
          <Link name="LOG OUT" linkTo="/" />
        </div>
      }

    </div>
  );
};

const styles = css`
  width: 100%;
  max-width: 620px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1000px) {
    max-width: 100%;
    padding: 0 30px 20px 30px;
    flex-direction: column;
    align-items: flex-start;
    opacity: 1;
    position: absolute;
    left: 0;
    top: 70px;
    background: rgba(35, 45, 57, 0.8);
    transition: top 1100ms ease-in-out, opacity 1100ms ease-in-out;
    &.hidden {
      left: 0;
      top: -500px;
    }
    .btn {
      width: 100%;
      text-align: center;
      padding: 16px;
    }
  }
`;

export default LinksContainer;
