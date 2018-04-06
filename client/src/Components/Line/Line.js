import React from "react";
import "./Line.css";
import Snote from "../Snote";

const Line = props => {
	return props.arrayOfNotes.map((element, index)=>{
	  <div className="line">
	      <Snote key = {props.lineNumber+'-s'+index} snoteNumber = {props.lineNumber+'-s'+index} note={element}/>
	  </div>
	});
};

export default Line;