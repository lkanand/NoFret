import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";
import Stfretguide from "./Stfretguide";
import DragScroll from 'react-dragscroll';


class ScaleTool extends Component {
	render() {
	    return (
			<div className="stFretboard" height={200} width={300}>
				<Stfretguide className="stFretGuide"/>
                {this.props.openstrings.map((string, ind) => {
                  return (
                  	<Ststring key={"strno"+ind+"openval"+string} stringvalue={string} boardstate={this.props} midi={this.props.midi}/>
                  );
                })}
				<Stfretguide className="stFretGuide"/>
			</div>
	    );
	}
}

export default ScaleTool;
