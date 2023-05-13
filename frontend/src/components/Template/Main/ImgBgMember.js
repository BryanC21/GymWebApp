/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import VideoBg from "../Image/scheduleBg.jpg";

const ImgBgMember = () => (
  <img src={VideoBg}><img />
    );

    const styles = css`
    min-width: 100%;
    min-height: 100vh;
    max-width: 100%;
    max-height: 100vh;
    object-fit: cover;
    z-index: -1;
    `;

    export default ImgBgMember;
