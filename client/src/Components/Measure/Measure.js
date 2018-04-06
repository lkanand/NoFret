import React from "react";
import "./Measure.css";
import Beat from "../Beat";

const Measure = props => {
  return props.arrayOfBeats.map((element, index)=>{
  <div className="measure" id={props.measureNumber}>
      <Beat key = {props.measureNumber+'-b'+{index}} beatNumber = {props.measureNumber+'-b'+{index}} arrayOfLines = {element}/>
  </div>
    });
};

export default Measure;