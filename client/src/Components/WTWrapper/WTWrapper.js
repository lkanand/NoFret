import React from "react";
import "./WTWrapper.css";
import LetterBox from "./components/LetterBox";

const WTWrapper = props => (
  <div className="forLetters">
  <LetterBox/>
  </div>

  <div className="forMeasures">
  {props.children}
  </div>
);

export default WTWrapper;