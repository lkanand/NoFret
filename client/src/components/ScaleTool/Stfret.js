import React, {Component} from "react";

class Stfret extends (Component) {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			scaleRoot: props.scaleRoot,
			scaleType: props.scaleType,
			boardstate: props.boardstate,
			scaleRel: "",
			hide: false,
			note: "",
			octave: 0,
			instrument: 275
		};
	};

	componentDidMount() {
		this.setScaleVals(this.state.scaleRoot, this.state.scaleType);
	};

	componentWillReceiveProps(props) {
		if (this.state.scaleRoot != props.scaleRoot) {
			this.setState({scaleRoot: props.scaleRoot});
			this.setScaleVals(props.scaleRoot, props.scaleType);
		} else if (this.state.scaleType != props.scaleType) {
			this.setState({scaleType: props.scaleType});
			this.setScaleVals(props.scaleRoot, props.scaleType);
		}
		// this.setState({mode: props.boardmode});
	}

	handleClick = () => {
		// console.log("shark");
		// edit mode
		if (this.props.boardmode === "edit") {
			console.log(this.props.boardmode + " should be edit")
			if (this.state.hide === false) {
				this.setState({hide: true});
			} else {
				this.setState({hide: false})
			}
		}
		// listen mode
		if (this.props.boardmode === "listen" && this.state.hide === false) {
			console.log(this.props.boardmode + " should be listen")


			const scientificPitch = this.state.note + this.state.octave;
			console.log(scientificPitch);
			console.log(this.state.value);
			this.props.midi.playChordNow(this.state.instrument, [this.state.value], .75);
		}
	}

	//scale relationships could be stored in DB 
	setScaleVals = (root, type) => {
		let newScaleValues = []
		if (type === "major") {
			newScaleValues.push(root, root+2, root+4, root+5, root+7, root+9, root+11);
		} else if (type === "major pent") {
			newScaleValues.push(root, root+2, root+4, root+7, root+9);
		} else if (type === "blues") {
			newScaleValues.push(root, root+3, root+5, root+6, root+7, root+10)
		} else if (type === "minor pent") {
			newScaleValues.push(root, root+3, root+5, root+7, root+10);
		} else if (type === "natural minor") {
			newScaleValues.push(root, root+2, root+3, root+5, root+7, root+8, root+10);
		} else if (type === "dorian") {
			newScaleValues.push(root, root+2, root+3, root+5, root+7, root+9, root+10);
		} else if (type === "mixolydian") {
			newScaleValues.push(root, root+2, root+4, root+5, root+7, root+9, root+10);
		}
		// this.setState({scaleValues: newScaleValues});
		this.fretInit(this.state.value, newScaleValues);
	};

	fretInit = (value, scale) => {
		this.setState({scaleRel: " "})
		const note = value%12;
		this.setState({hide: false})
		if (scale[0]%12 === note) {
			this.setState({scaleRel: "root"});
		} else if (scale[1]%12 === note) {
			this.setState({scaleRel: "second"});
		} else if (scale[2]%12 === note) {
			this.setState({scaleRel: "third"});
		} else if (scale[3]%12 === note) {
			this.setState({scaleRel: "fourth"});
		} else if (scale[4]%12 === note) {
			this.setState({scaleRel: "fifth"});
		} else if (scale[5]%12 === note) {
			this.setState({scaleRel: "sixth"});
		} else if (scale[6]%12 === note) {
			this.setState({scaleRel: "seventh"});
		} else {
			this.setState({hide: true})
		}

		if (note === 0) {
			this.setState({note: "C"});
		} else if (note === 1) {
			this.setState({note: "Db"});
		} else if (note === 2) {
			this.setState({note: "D"});
		} else if (note === 3) {
			this.setState({note: "Eb"});
		} else if (note === 4) {
			this.setState({note: "E"});
		} else if (note === 5) {
			this.setState({note: "F"});
		} else if (note === 6) {
			this.setState({note: "F#"});
		} else if (note === 7) {
			this.setState({note: "G"});
		} else if (note === 8) {
			this.setState({note: "Ab"});
		} else if (note === 9) {
			this.setState({note: "A"});
		} else if (note === 10) {
			this.setState({note: "Bb"});
		} else if (note === 11) {
			this.setState({note: "B"});
		}

		this.setState({octave: Math.floor(value/12)})
	};

	render() {
		return (
			<div className="fretSect" onClick={this.handleClick.bind(this)}>
               	<div className={this.state.hide ? 'stFret hideFret ' : 'stFret showFret '+this.state.scaleRel}>
               		{this.state.note}{this.state.octave}
              	</div>	
			</div>
		)
	};
};

export default Stfret;