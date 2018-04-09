import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";


class ScaleTool extends Component {
	state = {
		scaleType: "major",
		scaleRoot: 0,
		pentatonic: false,
		tuning: "standard",
		openStrings: []
	};

	componentDidMount() {
		this.tuneStrings(this.state.tuning);
	};

	tuneStrings = tuning => {
		// 0 = E1 anything below E1 is not supported by our app

		if (tuning === "standard") {
			this.setState({openStrings: [36, 31, 27, 22, 17, 12]});
		} else if (tuning === "drop D") {
			this.setState({openStrings: [36, 31, 27, 22, 17, 15]});
		} else if (tuning === "double drop D") {
			this.setState({openStrings: [34, 31, 27, 22, 17, 15]});
		} else if (tuning === "maj thirds") {
			this.setState({openStrings: [36, 32, 28, 24, 20, 16]});
		} else if (tuning === "all fourths") {
			this.setState({openStrings: [37, 32, 27, 22, 17, 12]});
		} else if (tuning === "aug fourths") {
			this.setState({openStrings: [38, 32, 26, 20, 14, 8]});
		} else if (tuning === "new standard") {
			this.setState({openStrings: [39, 36, 29, 22, 15, 8]});
		} else if (tuning === "open A") {
			this.setState({openStrings: [36, 29, 24, 21, 17, 12]});
		} else if (tuning === "slide open A") {
			this.setState({openStrings: [26, 33, 29, 24, 17, 12]});
		} else if (tuning === "open C") {
			this.setState({openStrings: [36, 32, 27, 20, 15, 8]});
		} else if (tuning === "open D") {
			this.setState({openStrings: [34, 29, 26, 22, 17, 10]});
		} else if (tuning === "open E") {
			this.setState({openStrings: [26, 31, 28, 24, 19, 12]});
		} else if (tuning === "open G") {
			this.setState({openStrings: [34, 31, 27, 22, 15, 10]});
		} else if (tuning === "DADGAD") {
			this.setState({openStrings: [34, 29, 27, 22, 17, 10]});
		} else if (tuning === "DADADD") {
			this.setState({openStrings: [34, 34, 29, 22, 17, 10]});
		} else if (tuning === "standard E-flat") {
			this.setState({openStrings: [35, 30, 26, 21, 16, 11]});
		} else if (tuning === "standard D") {
			this.setState({openStrings: [34, 29, 25, 20, 15, 10]});
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
