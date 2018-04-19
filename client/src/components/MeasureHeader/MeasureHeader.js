import React, { Component } from "react";
import "./MeasureHeader.css";
import axios from 'axios';

class MeasureHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			titleActive: false,
			loggedIn:props.loggedIn,
			tabId:props.tabId
		};

		this.modalFunction=props.modalFunction;
	}

	componentWillReceiveProps(props) {
		this.setState({loggedIn:props.loggedIn});
		
		if(this.state.tabId !== props.tabId) {
      		this.setState({tabId:props.tabId});
      		if(props.tabId === "")
      			this.setState({title: "", titleActive: false});
      		else {
      			let that = this;
		    	axios.get('api/onetab/'+props.tabId)
		    	.then(res =>that.setState({title: res.data.title, titleActive: false}))
		    	.catch(err => console.log(err));
	    	}
		}
  	}

	printTab = () => {
    	window.print();  
  	}

  	openTitleForm = () => {
  		let promiseOne = this.setState({titleActive: true});
  		Promise.all([promiseOne]).then(function() {
  			document.getElementById("tabTitle").focus();
  			document.getElementById("tabTitle").select();
  		});
  	}

  	closeTitleForm = (event) => {
  		event.preventDefault();
  		this.setState({titleActive: false});
  	}

  	submitTitleForm = (event) => {
  		event.preventDefault();
  		this.setState({titleActive: false});
  	}

  	handleTitleChange = (event) => {
  		event.preventDefault();
  		this.setState({title: event.target.value});
  	}

	render() {
		let title;
		if(this.state.titleActive === false)
			title = <h1 className = {this.state.title === "" ? "noTabTitle" : ""} onClick={() => this.openTitleForm()}>{this.state.title === "" ? "Click to Enter Title" : this.state.title}</h1>
		else
			title = <form onSubmit={(event) => this.submitTitleForm(event)} onBlur={(event) => this.closeTitleForm(event)}>
				<input id="tabTitle" onChange={(event) => this.handleTitleChange(event)} value={this.state.title}/>
			</form>	
		return ( 
			<div className={this.props.editMode ? "measureHeader" : "measureHeader noClick"}>
				<div className="titleSavePrint">
					<div className="tabTitleDiv">
						{title}
					</div>
					<div className="savePrint">
						{(this.state.loggedIn===false)
							?<button id="saveTab" onClick={this.modalFunction}><i className="fas fa-cloud-upload-alt"></i></button>
							:<button id="saveTab" onClick={()=>this.props.triggerSaveModal(this.state.title, this.props.allNotes, this.props.bpm, this.props.timeSig)}><i className="fas fa-cloud-upload-alt"></i></button>
						}
						<button id="newTab" className = {this.state.tabId === "" ? "displayNone" : ""} onClick={this.props.newTab}><i className="far fa-file"></i></button>
						<button id="printTab" onClick={this.printTab}><i className="fas fa-print"></i></button>
					</div>
				</div>
				<div className="addOrClearMeasures">
					<button id="addMeasure" onClick={this.props.addMeasure}>Add Measure</button>
          			<button id="clearMeasures" onClick={() => this.props.clearAllMeasures(this.props.timeSig)}>Reset</button>
				</div>
			</div>
	
		);
	}
}

export default MeasureHeader;