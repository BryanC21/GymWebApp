/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/core";
import React from "react";
import Output from "./Output";
import ClassOneBg from "../Image/fitness-class.jpg";
import ClassTwoBg from "../Image/weight-training-class.jpg";
import ClassThreeBg from "../Image/classThree.jpg";
import ClassFourBg from "../Image/stretchingBg-1.jpg";

const Results = ({ training }) => (
  <div css={styles} className="results">
    {training === "Fitness Class" && (
      <Output
        title="Fitness Class"
        info="Welcome to your fitness session! Get ready to break a sweat and unleash your inner athlete. This dynamic workout will elevate your heart rate, improve endurance, and strengthen your body. From cardio exercises to functional movements, this session will leave you feeling energized and accomplished. Let's get moving!"
        img={ClassOneBg}
      />
    )}

    {training === "Weight Training" && (
      <Output
        title="Weight Training"
        info="Welcome to the world of weight training! Get ready to challenge your muscles and boost your strength. Through targeted exercises and progressive resistance, weight training promotes muscle development, enhances bone density, and improves overall fitness. Get ready to lift, sweat, and see incredible results!"
        img={ClassTwoBg}
      />
    )}
    {training === "Body Building" && (
      <Output
        title="Body Building"
        info="Welcome to the world of bodybuilding! Get ready to sculpt your physique and push your limits. This intense training session focuses on building muscle mass, enhancing strength, and achieving a chiseled physique. Through a combination of resistance exercises and strict form, you'll witness incredible gains and transform your body. Let's lift heavy and reach new heights!"
        img={ClassThreeBg}
      />
    )}

    {training === "Professional Stretching" && (
      <Output
        title="Professional Stretching"
        info="Welcome to your stretching session! It's time to unwind, relax, and improve your flexibility. This session will help release tension, increase range of motion, and promote muscle recovery. Through a series of gentle stretches, you'll improve your posture, enhance mobility, and leave feeling rejuvenated. Let's stretch it out and find your inner calm!"
        img={ClassFourBg}
      />
    )}
  </div>
);

const styles = css`
  width: 100%;
  max-width: 60%;
  .test {
    width: 100%;
    height: 400px;
    background: red;
    &.two {
      background: blue;
    }
  }
  @media(max-width: 900px){
    max-width: 590px;
    padding: 30px 0 0 0;
  }
  @media (min-width: 901px) and (max-width: 1226px){
    max-width: 62%;
  }
`;

export default Results;
