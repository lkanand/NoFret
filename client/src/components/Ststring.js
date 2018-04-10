import React, {Component} from "react";
import Stfret from "./Stfret";

class Ststring extends (Component) {
	state = {
		stringvalue: this.props.stringvalue,
		boardstate: this.props.boardstate,
		allNotes: []
	}

	componentDidMount() {
		this.defineFrets(this.state.stringvalue);
	}

	defineFrets = openNote => {
		const allNotes = [];
		for (let i=0;i<25;i++) {
			const fretValue = openNote + i;
			allNotes.push(fretValue);
		}
		this.setState({allNotes: allNotes})
	}

	render() {
		return (
			<div className="stString" stringvalue={this.props.stringvalue} >
                {this.state.allNotes.map((notevalue, index) => {
                  return (
					<Stfret key = {index} value={notevalue} boardstate={this.state.boardstate}/>
                  );
                })}
			</div>	
		)
	}
}

export default Ststring;