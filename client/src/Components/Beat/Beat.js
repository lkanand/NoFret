import React from "react";
import "./Beat.css";
import Line from "../Line";

const Beat = props => (
  <div className={props.beatPosition}>
  	<Line {
  		note:{props.note}
  		lineNumber="e"
  		lbmnumber=`${props.bmnumber}-e`
  	}</Line>

  	<Line {
  		note:{props.note}
  		lineNumber="B"
  		lbmnumber=`${props.bmnumber}-B`
  	}</Line>

  	<Line {
  		note:{props.note}
  		lineNumber="G"
  		lbmnumber=`${props.bmnumber}-G`
  	}</Line>

  	<Line {
  		note:{props.note}
  		lineNumber="D"
  		lbmnumber=`${props.bmnumber}-D`
  	}</Line>

  	<Line {
  		note:{props.note}
  		lineNumber="A"
  		lbmnumber=`${props.bmnumber}-A`
  	}</Line>

  	<Line {
  		note:{props.note}
  		lineNumber="E"
  		lbmnumber=`${props.bmnumber}-E`
  	}</Line>
  </div>
);

export default Beat;