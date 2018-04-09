import React, {Component} from "react";

//assign note value as I create them based on each string's open value
// if props.value%12

//assign display property as I create them based on the value (if it is in the scale display if it isn't)
class Stfret extends (Component) {
	state = {
		value: this.props.value,
		scaleRoot: this.props.boardstate.scaleRoot,
		scaleType: this.props.boardstate.scaleType,
		scaleValues: [],
		boardstate: this.props.boardstate,
		scaleRel: "",
		hideShow: "showFret",
		note: ""
	}

	componentDidMount() {
		this.setNote(this.state.value);
		this.setScaleVals(this.state.scaleRoot, this.state.scaleType);
	}

	setScaleVals = (root, type) => {
		if (type === "major") {
			this.state.scaleValues.push(root, root+2, root+4, root+5, root+7, root+9, root+11);
		} else if (type === "major pent") {
			this.state.scaleValues.push(root, root+2, root+4, root+7, root+9)
		}
		// console.log(valArr);
		this.setRel(this.state.value);
	}

	setRel = value => {
		const note = value%12;
		if (this.state.scaleValues[0]%12 === note) {
			this.setState({scaleRel: "root"});
		} else if (this.state.scaleValues[1]%12 === note) {
			this.setState({scaleRel: "second"});
		} else if (this.state.scaleValues[2]%12 === note) {
			this.setState({scaleRel: "third"});
		} else if (this.state.scaleValues[3]%12 === note) {
			this.setState({scaleRel: "fourth"});
		} else if (this.state.scaleValues[4]%12 === note) {
			this.setState({scaleRel: "fifth"});
		} else if (this.state.scaleValues[5]%12 === note) {
			this.setState({scaleRel: "sixth"});
		} else if (this.state.scaleValues[6]%12 === note) {
			this.setState({scaleRel: "seventh"});
		}
		//  else {
		// 	this.setState({hideShow: "hideFret"})
		// }
	}

	setNote = value => {
		// console.log("=============");
		// console.log("set Notes");
		// console.log("=============");
		const note = value%12
		if (note === 0) {
			this.setState({note: "E"});
		} else if (note === 1) {
			this.setState({note: "F"});
		} else if (note === 2) {
			this.setState({note: "F#"});
		} else if (note === 3) {
			this.setState({note: "G"});
		} else if (note === 4) {
			this.setState({note: "Ab"});
		} else if (note === 5) {
			this.setState({note: "A"});
		} else if (note === 6) {
			this.setState({note: "Bb"});
		} else if (note === 7) {
			this.setState({note: "B"});
		} else if (note === 8) {
			this.setState({note: "C"});
		} else if (note === 9) {
			this.setState({note: "Db"});
		} else if (note === 10) {
			this.setState({note: "D"});
		} else if (note === 11) {
			this.setState({note: "Eb"});
		}
	}

	render() {
		return (
			<div className="fretSect">
				<div className={'stFret '+this.state.scaleRel+" "+this.state.hideShow} notevalue={this.state.value}>{this.state.note}</div>
			</div>
		)
	}
}


// const Stfret = props => (
// 	<div className="stFret">{props.value}</div>
// );

export default Stfret;