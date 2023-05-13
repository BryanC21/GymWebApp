/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import DumbbellBg from "../Image/gym-icon.png";
import Button from "../GlobalComponents/Button";

const LinksContainer = ({ setTraining, training }) => (
  <div css={styles} className="linksContainer">
    <button
      className={training === "Fitness Class" ? "active" : ""}
      onClick={() => setTraining("Fitness Class")}
    >
      <img src={DumbbellBg} alt="dumbbell" /> Fitness Class
    </button>
    <button
      className={training === "Weight Training" ? "active" : ""}
      onClick={() => setTraining("Weight Training")}
    >
      <img src={DumbbellBg} alt="dumbbell" /> Weight Training
    </button>
    <button
      className={training === "Body Building" ? "active" : ""}
      onClick={() => setTraining("Body Building")}
    >
      <img src={DumbbellBg} alt="dumbbell" /> Body Building
    </button>
    <button
      className={training === "Professional Stretching" ? "active" : ""}
      onClick={() => setTraining("Professional Stretching")}
    >
      <img src={DumbbellBg} alt="dumbbell" /> Professional Stretching
    </button>
  </div>
);

const styles = css`
  width: 100%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  button {
    width: 100%;
    padding: 28px 36px;
    color: #232d39;
    font-weight: 500;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    margin-bottom: 36px;
    border: none;
    outline: none;
    font-size: 20px;
    &.active {
      color: #ed563b;
    }
    img {
      margin-right: 20px;
    }
  }
  .btn {
    padding: 24px 0;
    border-radius: 4px;
  }
  @media (max-width: 900px) {
    max-width: 590px;
  }
  @media (min-width: 901px) and (max-width: 1226px) {
    max-width: 280px;
  }
`;

export default LinksContainer;
