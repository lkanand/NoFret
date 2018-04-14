import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";
import Stfretguide from "./Stfretguide"

class ScaleTool extends Component {
	render() {
	    return (
			<div className="stFretboard">
				<Stfretguide />
                {this.props.openstrings.map(string => {
                  return (
                  	<Ststring key={string} stringvalue={string} boardstate={this.props} midi={this.props.midi}/>
                  );
                })}
				<Stfretguide />
			</div>

	    );
	}
}

export default ScaleTool;
