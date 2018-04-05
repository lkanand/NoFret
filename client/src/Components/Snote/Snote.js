import React from "react";
import "./Snote.css";

const Snote = props => (
  <div className={props.position} id={props.slbmnumber} onClick{()=>props.clicked(props.slbmnumber)>
  {props.note}
  </div>
);

export default Snote;