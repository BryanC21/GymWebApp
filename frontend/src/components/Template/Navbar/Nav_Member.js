/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import Logo from "./Logo";
import LinksContainer_Member from "./LinksContainer_Member";
import Container from "../GlobalComponents/Container";

const Nav_Member = () => {
  const [hidden, setHidden] = useState(true);

  return (
    <nav css={styles}>
      <Container>
        <Logo />
        <i
          onClick={() => setHidden(!hidden)}
          className={hidden ? "fas fa-bars fa-lg" : "fas fa-times fa-lg"}
          id="burgerMenu"
        ></i>
        <LinksContainer_Member hidden={hidden} />
      </Container>
    </nav>
  );
};

const styles = css`
  width: 100%;
  position: absolute;
  top: 0;
  padding: 20px 0;
  background: rgba(250, 250, 250, 0.1);
  z-index: 20;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    #burgerMenu {
      color: #fff;
      cursor: pointer;
      display: none;
    }
  }
  @media (max-width: 1000px) {
    background: rgba(35, 45, 57, 0.8);
    .container {
      flex-wrap: wrap;
      #burgerMenu {
        display: block;
      }
    }
  }
`;

export default Nav_Member;
