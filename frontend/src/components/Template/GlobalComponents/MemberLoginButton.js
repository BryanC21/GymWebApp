/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";

const MemberLoginButton = ({ text }) => (
  <a css={styles} href="#/" className="btn">
    LOGIN
  </a>
);

const styles = css`
  text-decoration: none;
  display: inline-block;
  background: #ed563b;
  color: #fff;
  font-size: 14px;
  padding: 12px 14px;
  transition: background 500ms ease-in-out;
  &:hover {
    background: #f9735b;
  }
`;

export default MemberLoginButton;
