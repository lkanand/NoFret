import React, { Component } from "react";
import "./MeasureHeader.css";
import axios from 'axios';

class MeasureHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			titleActive: false,
			loggedIn:props.loggedIn
		};

		this.modalFunction=props.modalFunction;
	}

	componentWillReceiveProps(props) {
		this.state.loggedIn=props.loggedIn;
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

  	closeTitleForm = () => {
  		this.setState({titleActive: false});
  	}

  	submitTitleForm = (event) => {
  		event.preventDefault();
  		this.setState({titleActive: false});
  	}

  	handleTitleChange = (event) => {
  		this.setState({title: event.target.value});
  	}

  	triggerSaveModal = () => {
        

            let tabData={
                title:this.state.title,
                notes:this.props.allNotes,
                bpm:this.state.bpm,
                timeSig:this.state.timeSig
            };

            axios.post('api/usertabs',tabData)
            .then(data=>{
                console.log(data);
            })
            .catch(err=>{console.log(err);
            });

    }

	render() {
		let title;
		if(this.state.titleActive === false)
			title = <h1 className = {this.state.title === "" ? "noTabTitle" : ""} onClick={() => this.openTitleForm()}>{this.state.title === "" ? "Click to Enter Title" : this.state.title}</h1>
		else
			title = <form onSubmit={(event) => this.submitTitleForm(event)} onBlur={this.closeTitleForm}>
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
							?<button id="saveTab" onClick={this.modalFunction}><i class="fas fa-cloud-upload-alt"></i></button>
							:<button id="saveTab" onClick={this.triggerSaveModal}><i class="fas fa-cloud-upload-alt"></i></button>
						}
						<button id="printTab" onClick={this.printTab}><i class="fas fa-print"></i></button>
					</div>
				</div>
				<div className="addOrClearMeasures">
					<button id="addMeasure" onClick={this.props.addMeasure}>Add Measure</button>
          			<button id="clearMeasures" onClick={this.props.clearAllMeasures}>Reset</button>
				</div>
			</div>
	
		);
	}
}

export default MeasureHeader;