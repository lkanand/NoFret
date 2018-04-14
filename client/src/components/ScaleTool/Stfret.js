import React, {Component} from "react";

class Stfret extends (Component) {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			scaleRoot: props.scaleRoot,
			scaleType: props.scaleType,
			scaleRel: "",
			hide: false,
			note: "",
			octave: 0,
			instrument: 275
		};
	};

	componentDidMount() {
		this.setScaleVals(this.props.scaleRoot, this.props.scaleType);
	};

	handleClick = () => {
		// edit mode
		if (this.props.boardmode === "edit") {
			if (this.state.hide === false) {
				this.setState({hide: true});
			} else {
				this.setState({hide: false})
			}
		}
		// listen mode
		if (this.props.boardmode === "listen" && this.state.hide === false) {
			this.props.midi.playChordNow(this.state.instrument, [this.props.value], .75);
		}
	}

	componentWillReceiveProps(props) {
		if (this.state.scaleRoot !== props.scaleRoot || this.state.scaleType !== props.scaleType) {
			this.setState({scaleRoot: props.scaleRoot});
			this.setState({scaleType: props.scaleType});
			this.setScaleVals(props.scaleRoot, props.scaleType);
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
		} else if (type === "noscale") {
			newScaleValues.push()
		}
		this.fretInit(this.props.value, newScaleValues);
	};

	// something in this is not updating "fast" enough 
	fretInit = (value, scale) => {
		this.setState({scaleRel: " "})
		const note = value%12;
		if (scale.length > 4) {
			this.setState({hide: false})
			const notes = scale.map(x => x%12)
			if (notes[0] === note) {
				this.setState({scaleRel: "root"})
			} else if (notes.includes(note)) {
				this.setState({scaleRel: "inscale"});
			} else {
				this.setState({scaleRel: "noRel"})
				this.setState({hide: true})
			}
		} else {
			this.setState({scaleRel: " "})
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

		this.setState({octave: Math.floor(value/12)});
	};

	render() {
		return (
			<div className="fretSect" onClick={this.handleClick.bind(this)}>
               	<div className={this.state.hide ? 'stFret hideFret '+this.state.note : 'stFret showFret '+this.state.scaleRel+' '+this.state.note}>
               {/*these do not change*/}
               {this.state.note}{this.state.octave}
              	</div>	
			</div>
		)
	};
};

export default Stfret;