import React, {Component} from "react";
import Stfret from "./Stfret";

class Ststring extends (Component) {

	constructor(props) {
		super(props);
		this.state = {
			stringvalue: props.stringvalue,
			boardstate: props.boardstate,
			allNotes: []
		}
	}
		
	componentDidMount() {
		this.defineFrets(this.state.stringvalue);
	}

	componentWillReceiveProps(props) {
		console.log("props recieved by strings");
		this.setState({boardstate: props.boardstate});
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