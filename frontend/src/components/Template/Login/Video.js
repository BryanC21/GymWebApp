/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import Imgbg from "../Image/classThree.jpg";

const IMG = () => (
  <IMG class="displayed" src="..." alt="...">
    <source src={Imgbg} type="video/mp4" />
  </IMG>
);

const styles = css`
  min-width: 100%;
  min-height: 100vh;
  max-width: 100%;
  max-height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

export default IMG;
