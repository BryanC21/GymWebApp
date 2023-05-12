/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import Button from "../GlobalComponents/Button";

const Info = () => (
  <div css={styles} className="info">
    <h1>
      GET FIT WITH OUR <span>TECH</span>
    </h1>
    <Button text="CHECK OUT OUR GYM"/>
  </div>
);

const styles = css`
  width: 100%;
  max-width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  color: #fff;
  p {
    font-size: 17px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 1.2px;
  }
  h1 {
    font-size: 90px;
    line-height: 1;
    font-weight: 900;
    margin: 36px 0;
    span {
      color: #ed563b;
    }
  }
  .btn {
    padding: 14px 16px;
  }
  @media (max-width: 1000px) {
    h1 {
      font-size: 42px;
    }
  }
`;

export default Info;
