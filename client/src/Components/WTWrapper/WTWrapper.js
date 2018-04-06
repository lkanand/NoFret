import React from "react";
import LetterBox from "../LetterBox";
import Measure from "../Measure";

const WTWrapper = props => (
<div>
  <div className="forLetters">
  <LetterBox/>
  </div>

  <div className="forMeasures">
  	<Measure
  	measureNumber="m1">

  	</Measure>
  </div>
 </div>
);

export default WTWrapper;