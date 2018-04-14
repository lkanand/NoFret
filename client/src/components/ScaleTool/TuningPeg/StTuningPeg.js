import React, { Component } from 'react';
import StString from "../Ststring"
import "./StTuningPeg.css"

class StTuningPeg extends (Component) {

	constructor(props) {
		super(props);
		this.state = {
			stringvalue: props.stringvalue
		}
	}

	incrementValue = () => {
		this.setState((prevState) => {
			return {stringvalue: prevState.stringvalue + 1}
		})
	}

	decrementValue = () => {
		this.setState((prevState) => {
			return {stringvalue: prevState.stringvalue - 1}
		})
	}

	render() {
		console.log(this.state.stringvalue);
		return (
			<div className="stLine">
				<div className = "tuningPeg">
					<button onClick={this.incrementValue}>Up</button>
					<button onClick={this.decrementValue}>Down</button>
				</div>
				<StString boardstate={this.props.boardstate} stringvalue={this.state.stringvalue} midi={this.props.midi}/>
			</div>
		)
	}

}

export default StTuningPeg; 