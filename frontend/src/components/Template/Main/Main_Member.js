/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import Video from "./Video";
import Overlay from "./Overlay";
import Info from "./Info";
import Nav_Member from "../Navbar/Nav_Member";

const Main_Member = () => (
  <section css={styles} className="main" id="home">
    <Overlay />
    <Nav_Member />
    <Info />
    <Video />
  </section>
);

const styles = css`
  width: 100%;
  height: 100vh;
`;

export default Main_Member;
