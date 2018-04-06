import React from "react";
import "./Snote.css";

const Snote = props => (
  <div className="note" key={props.snoteNumber} id={props.snoteNumber} onChange={props.handleInputChange} >
  {props.note.value}
  </div>
);

export default Snote;