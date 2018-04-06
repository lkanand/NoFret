import React from "react";
import "./Beat.css";
import Line from "../Line";

const Beat = props => {
  return props.arrayOfLines.map((element, index)=>{
    <div className="beat">
      <Line key = {props.beatNumber+'-l'+index} lineNumber = {props.beatNumber+'-l'+index} arrayOfNotes = {element}/>
    </div>
    });
};

  

export default Beat;