import React, {Component} from "react";
import Stfret from "./Stfret";
// import StTuningPeg from "./TuningPeg/StTuningPeg";

class Ststring extends (Component) {

	constructor(props) {
		super(props);
		this.state = {
			stringvalue: props.stringvalue,
			allNotes: [],
			openNote: ""
		}
	}
		
	componentDidMount() {
		this.defineFrets(this.state.stringvalue);
	}

	componentWillReceiveProps(props) {
		// console.log("string")
		// console.log(props.stringvalue)
		this.setState({boardstate: props.boardstate});
		this.setState({stringvalue: props.stringvalue});
		this.defineFrets(props.stringvalue);
	}

	defineFrets = openNote => {
		const note = openNote%12;
		let letter = " "
		if (note === 0) {
			letter= "C";
		} else if (note === 1) {
			letter = "Db";
		} else if (note === 2) {
			letter = "D";
		} else if (note === 3) {
			letter = "Eb";
		} else if (note === 4) {
			letter = "E";
		} else if (note === 5) {
			letter = "F";
		} else if (note === 6) {
			letter = "F#";
		} else if (note === 7) {
			letter = "G";
		} else if (note === 8) {
			letter = "Ab";
		} else if (note === 9) {
			letter = "A";
		} else if (note === 10) {
			letter = "Bb";
		} else if (note === 11) {
			letter = "B";
		}

		this.setState({openNote: letter+Math.floor(openNote/12)})


		// console.log("fired");
		// console.log(openNote);
		const allNotes = [];
		for (let i=0;i<25;i++) {
			const fretValue = openNote + i;
			allNotes.push(fretValue);
		}
		this.setState({allNotes: allNotes})
		// console.log(this.state.allNotes);
		// console.log(allNotes);
	}

	render() {
		return (
			<div className="stString">
                <div className="StStringValue">{this.state.openNote}</div>
                {this.state.allNotes.map((notevalue, index) => {
                  return (  
					<Stfret key={index} value={notevalue} midi={this.props.midi} boardmode={this.props.boardstate.mode} scaleRoot={this.props.boardstate.root} scaleType={this.props.boardstate.scaleType}/>
                  );
                })}
			</div>	
		)
	}
}

export default Ststring;