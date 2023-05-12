/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";

const Logo = () => (
  <h2 css={styles}>
    Tech <span>Fit</span>
  </h2>
);

const styles = css`
  color: #fff;
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  span {
    color: #ed563b;
  }
`;

export default Logo;
