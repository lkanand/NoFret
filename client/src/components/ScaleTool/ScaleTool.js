import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";
import Stfretguide from "./Stfretguide"

class ScaleTool extends Component {
	render() {
	    return (
			<div className="stFretboard">
				<Stfretguide className="stFretGuide"/>
                {this.props.openstrings.map((string, ind) => {
                	console.log(ind);
                	console.log(string);
                  return (
                  	<Ststring key={string} stringvalue={string} boardstate={this.props} midi={this.props.midi}/>
                  );
                })}
				<Stfretguide className="stFretGuide"/>
			</div>

	    );
	}
}

export default ScaleTool;
