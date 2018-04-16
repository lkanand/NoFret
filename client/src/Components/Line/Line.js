import React from "react";
import "./Line.css";
import Snote from "../Snote";

const Line = props => {
	let {arrayOfLines, ...other} = props;
	return arrayOfLines.map((element, index)=>{
	  	return (
	  		<div className="line" key={index} >
	      		<Snote lineIndex = {props.beatIndex+'-l'+index} arrayOfNotes = {element} {...other}/>
	  		</div>
	  	)
	});
};

export default Line;