import React, {Component} from "react";
import Stfret from "./Stfret";

class Ststring extends (Component) {

	constructor(props) {
		super(props);
		this.state = {
			stringvalue: props.stringvalue,
			allNotes: []
		}
	}
		
	componentDidMount() {
		this.defineFrets(this.state.stringvalue);
	}

	componentWillReceiveProps(props) {
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
					<Stfret key = {index} value={notevalue} midi={this.props.midi} boardmode={this.props.boardstate.mode} scaleRoot={this.props.boardstate.scaleRoot} scaleType={this.props.boardstate.scaleType}/>
                  );
                })}
			</div>	
		)
	}
}

export default Ststring;