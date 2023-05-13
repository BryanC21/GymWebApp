/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import Video from "./Video";
import Overlay from "./Overlay";
import Nav_Member from "../Navbar/Nav_Member";
import ShowCurrentClass from "../../widgets/ShowCurrentClass";

const Main_Member = () => (
  <section css={styles} className="main" id="home">
    <Overlay />
    <Nav_Member />
    <ShowCurrentClass />
    <Video />
  </section>
);

const styles = css`
  width: 100%;
  height: 100vh;
`;

export default Main_Member;
