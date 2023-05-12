/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import Video from "./Video";
import Overlay from "./Overlay";
import Info from "./Info";
import Nav_Employee from "../Navbar/Nav_Employee";

const Main_Employee = () => (
  <section css={styles} className="main_employee" id="home">
    <Overlay />
    <Nav_Employee />
    <Info />
    <Video />
  </section>
);

const styles = css`
  width: 100%;
  height: 100vh;
`;

export default Main_Employee;
