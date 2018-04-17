import React, { Component } from "react";
import "./MeasureHeader.css";

class MeasureHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			titleActive: false
		};
	}

	printTab = () => {
    	window.print();  
  	}

	render() {
		return ( 
			<div className = {this.props.editMode ? "measureHeader" : "measureHeader noClick"}>
				<h1>{this.state.title === "" ? "Click to Enter Title" : this.state.title}</h1>
				<button id="saveTab">Save Tab</button>
				<button id="printTab" onClick={this.printTab}>Print Tab</button>
			</div>
		);
	}
}

export default MeasureHeader;