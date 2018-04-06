import React from "react";
import "./Measure.css";
import Beat from "../Beat";

const Measure = props => (
  <div className="measure" id={props.measureNumber}>
  	<Beat
  		note={props.note}
  		beatPostion="first"
  		bmnumber={props.measureNumber+"-b1"}
  	></Beat>
  	<Beat
  		note={props.note}
  		beatPostion="middle"
  		bmnumber={props.measureNumber+"-b2"}
  	></Beat>
  	<Beat
  		note={props.note}
  		beatPostion="middle"
  		bmnumber={props.measureNumber+"-b3"}
  	></Beat>
  	<Beat
  		note={props.note}
  		beatPostion="last"
  		bmnumber={props.measureNumber+"-b4"}
  	></Beat>
  </div>
);

export default Measure;