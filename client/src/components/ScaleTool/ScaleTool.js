import React, {Component} from "react";
import StTuningPeg from "./TuningPeg/StTuningPeg";
import "./ScaleTool.css";
import Stfretguide from "./Stfretguide"

class ScaleTool extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		scaleType: props.scaleType,
	// 		scaleRoot: props.root,
	// 		tuning: props.tuning,
	// 		openStrings: props.openstrings,
	// 		mode: props.mode
	// 	};
	// }

	componentWillReceiveProps(props) {
		console.log(props);
		// this.setState({scaleType: props.scaleType});
		// this.setState({scaleRoot: props.root})
		// this.setState({openStrings: props.openstrings})
		// this.setState({mode: props.mode})
	}

	render() {
	    return (
			<div className="stFretboard">


				<Stfretguide />
                {this.props.openstrings.map(string => {
                  return (
                  	<StTuningPeg key={string} stringvalue={string} boardstate={this.props} midi={this.props.midi}/>
                  );
                })}
				<Stfretguide />
			</div>

	    );
	}
}

export default ScaleTool;
