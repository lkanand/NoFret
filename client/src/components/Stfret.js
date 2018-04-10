import React, {Component} from "react";

class Stfret extends (Component) {
	state = {
		value: this.props.value,
		scaleRoot: this.props.boardstate.scaleRoot,
		scaleType: this.props.boardstate.scaleType,
		scaleValues: [],
		boardstate: this.props.boardstate,
		scaleRel: "",
		hide: false,
		note: "",
		octave: 0,
	};

	componentDidMount() {
		this.setScaleVals(this.state.scaleRoot, this.state.scaleType);
	};

	handleClick = () => {
		// edit mode
		if (this.state.boardstate.mode === "edit") {
			if (this.state.hide === false) {
				this.setState({hide: true});
			} else {
				this.setState({hide: false})
			}
		}
		// listen mode
		if (this.state.boardstate.mode === "listen" && this.state.hide === false) {
			console.log(this.state.note+this.state.octave);
		}
		// write mode
	}

	//scale relationships could be stored in DB 
	setScaleVals = (root, type) => {
		if (type === "major") {
			this.state.scaleValues.push(root, root+2, root+4, root+5, root+7, root+9, root+11);
		} else if (type === "major pent") {
			this.state.scaleValues.push(root, root+2, root+4, root+7, root+9)
		}
		this.fretInit(this.state.value);
	};

	fretInit = value => {
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
		 else {
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

		if (value === 0) {
			this.setState({octave: 1})
		} else {
			this.setState({octave: Math.ceil(value/12)})
		}

	};

	render() {
		return (
			<div className="fretSect" onClick={this.handleClick}>

                {this.state.hide ? 
                	<div className={'stFret hideFret '+this.state.scaleRel} noteoctave={this.state.octave} notevalue={this.state.value}>
                		{this.state.note}
                	</div>
                : <div className={'stFret '+this.state.scaleRel} noteoctave={this.state.octave} notevalue={this.state.value}>
                	{this.state.note}
                </div>
                }
			</div>
		)
	};
};

export default Stfret;