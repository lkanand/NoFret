import React from "react";
import "./LetterBox.css";

const LetterBox = (props) => (
  <div className="chordLetters">
  		{/*props.length*/}
        {props.openStrings.map(string => {
          return (
			<div className="letter">{string}</div>
          );
        })}
	</div>
);

export default LetterBox;