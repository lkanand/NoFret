import React, {Component} from "react";
import Stfret from "./Stfret";


//change strings into components
//assign open value as I create them based on selected tuning


class Ststring extends (Component) {
	state = {
		stringvalue: this.props.stringvalue,
		boardstate: this.props.boardstate,
		allNotes: [0, 1, 2, 3, 4, 5]
	}

	componentDidMount() {
		this.defineFrets(this.state.stringvalue);
	}

	defineFrets = openNote => {
		const allNotes = [];
		for (let i=0;i<24;i++) {
			const fretValue = openNote + i;
			allNotes.push(fretValue);
		}
		this.setState({allNotes: allNotes})
	}

	render() {
		return (
			<div className="stString" stringvalue={this.props.stringvalue} >
                {this.state.allNotes.map(notevalue => {
                  return (
					<Stfret value={notevalue} />
                  );
                })}
			</div>	
		)
	}
}

export default Ststring;



