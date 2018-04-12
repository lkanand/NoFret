import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";
import Stfretguide from "./Stfretguide"

class ScaleTool extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scaleType: props.scaleType,
			scaleRoot: props.root,
			tuning: props.tuning,
			openStrings: props.openstrings,
			mode: "listen"
		};
	}

	componentWillReceiveProps(props) {
		this.setState({scaleType: props.scaleType});
		this.setState({scaleRoot: props.root})
		this.setState({openStrings: props.openstrings})
		this.setState({mode: props.mode})
	}

	render() {
	    return (
			<div className="stFretboard">


				<Stfretguide />
                {this.state.openStrings.map(string => {
                  return (
                  	<Ststring key={string} stringvalue={string} boardstate={this.state} midi={this.props.midi}/>
                  );
                })}
				<Stfretguide />
			</div>

	    );
	}
}

export default ScaleTool;
