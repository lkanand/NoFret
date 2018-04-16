import React from "react";
import "./Beat.css";
import Line from "../Line";

const Beat = props => {
	let {arrayOfBeats, ...other} = props;
	return arrayOfBeats.map((element, index)=>{
  		return (
    		<div className="beat" key={index} >
      			<Line beatIndex = {props.measureIndex+'-b'+index} arrayOfLines = {element} {...other}/>
    		</div>
    	)
    });
} 

export default Beat;