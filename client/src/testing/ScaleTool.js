import React, {Component} from "react";
import Ststring from "./Ststring";
import "./ScaleTool.css";


class ScaleTool extends Component {
	state = {
		scaleType: "Major",
		scaleRoot: "G",
		pentatonic: false,
		tuning: "standard",
		openStrings: []
	};

	componentDidMount() {
		this.tuneStrings(this.state.tuning);
	};

	tuneStrings = tuning => {
		if (tuning === "standard") {
			this.setState({openStrings: [24, 19, 15, 10, 5, 0]});
		} else if (tuning === "drop d") {
			this.setState({openStrings: [24, 19, 15, 10, 5, -2]});
		}
		console.log("=============");
		console.log("Tuned Strings");
		console.log("=============");
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


// const ScaleTool = () => (
//   <div className="stFretboard">
//   	<div className="stString" data-stStringNumber="6" >
// 		<div className="stFret">E</div>
// 		<div className="stFret">F</div>
// 		<div className="stFret">F#</div>
// 		<div className="stFret">G</div>
// 		<div className="stFret">Ab</div>
// 		<div className="stFret">A</div>
// 		<div className="stFret">Bb</div>
//   	</div>
//   	<div className="stString" data-stStringNumber="5">
// 		<div className="stFret">B</div>
// 		<div className="stFret">C</div>
// 		<div className="stFret">Db</div>
// 		<div className="stFret">D</div>
// 		<div className="stFret">Eb</div>
// 		<div className="stFret">E</div>
// 		<div className="stFret">F</div>
//   	</div>
//   	<div className="stString" data-stStringNumber="4">
// 		<div className="stFret">G</div>
// 		<div className="stFret">Ab</div>
// 		<div className="stFret">A</div>
// 		<div className="stFret">Bb</div>
// 		<div className="stFret">B</div>
// 		<div className="stFret">C</div>
// 		<div className="stFret">Db</div>
//   	</div>
//   	<div className="stString" data-stStringNumber="3">
// 		<div className="stFret">D</div>
// 		<div className="stFret">Eb</div>
// 		<div className="stFret">E</div>
// 		<div className="stFret">F</div>
// 		<div className="stFret">F#</div>
// 		<div className="stFret">G</div>
// 		<div className="stFret">Ab</div>
//   	</div>
//   	<div className="stString" data-stStringNumber="2">
// 		<div className="stFret">A</div>
// 		<div className="stFret">Bb</div>
// 		<div className="stFret">B</div>
// 		<div className="stFret">C</div>
// 		<div className="stFret">Db</div>
// 		<div className="stFret">D</div>
// 		<div className="stFret">Eb</div>
//   	</div>  		
//   	<div className="stString" data-stStringNumber="1">
// 		<div className="stFret">E</div>
// 		<div className="stFret">F</div>
// 		<div className="stFret">F#</div>
// 		<div className="stFret">G</div>
// 		<div className="stFret">Ab</div>
// 		<div className="stFret">A</div>
// 		<div className="stFret">Bb</div>
//   	</div>  		
//   </div>
// );

export default ScaleTool;
