import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";


class ScaleTool extends Component {
	state = {
		scaleType: "major",
		// root 0 = c
		scaleRoot: 4,
		pentatonic: false,
		tuning: "standard",
		openStrings: [],
		mode: "listen"
		// edit listen or write
	};

	componentDidMount() {
		this.tuneStrings(this.state.tuning);
	};

	tuneStrings = tuning => {
		// 0 = C1 anything below E1 is not supported by our app

		if (tuning === "standard") {
			this.setState({openStrings: [40, 35, 31, 26, 21, 16]});
		} else if (tuning === "drop D") {
			this.setState({openStrings: [40, 35, 31, 26, 21, 14]});
		} else if (tuning === "double drop D") {
			this.setState({openStrings: [38, 35, 31, 26, 21, 14]});
		} else if (tuning === "maj thirds") {
			this.setState({openStrings: [38, 34, 30, 26, 22, 18]});
		} else if (tuning === "all fourths") {
			this.setState({openStrings: [41, 36, 31, 26, 21, 16]});
		} else if (tuning === "aug fourths") {
			this.setState({openStrings: [42, 36, 30, 24, 18, 12]});
		} else if (tuning === "new standard") {
			this.setState({openStrings: [43, 40, 33, 26, 19, 12]});
		} else if (tuning === "open A") {
			this.setState({openStrings: [40, 33, 28, 25, 21, 16]});
		} else if (tuning === "slide open A") {
			this.setState({openStrings: [40, 37, 33, 28, 21, 16]});
		} else if (tuning === "open C") {
			this.setState({openStrings: [40, 36, 31, 24, 19, 12]});
		} else if (tuning === "open D") {
			this.setState({openStrings: [38, 33, 30, 26, 21, 14]});
		} else if (tuning === "open E") {
			this.setState({openStrings: [40, 35, 32, 28, 23, 16]});
		} else if (tuning === "open G") {
			this.setState({openStrings: [38, 35, 31, 26, 19, 14]});
		} else if (tuning === "DADGAD") {
			this.setState({openStrings: [38, 33, 31, 26, 21, 14]});
		} else if (tuning === "DADADD") {
			this.setState({openStrings: [38, 38, 33, 26, 21, 14]});
		} else if (tuning === "standard Eb") {
			this.setState({openStrings: [39, 34, 30, 25, 20, 15]});
		} else if (tuning === "standard D") {
			this.setState({openStrings: [38, 33, 29, 24, 19, 14]});
		}
		// console.log("=============");
		// console.log("Tuned Strings");
		// console.log("=============");
	}

	render() {
	    return (
			<div className="stFretboard">
                {this.state.openStrings.map(string => {
                  return (
                  	<Ststring key={string} stringvalue={string} boardstate={this.state}/>
                  );
                })}
			</div>
	    );
	}
}

export default ScaleTool;
