import React, { Component } from "react";
import "./Snote.css";

class Snote extends Component {

	focus(input) {
		if(input !== null && this.props.activeNoteId === "") {
			input.focus();
			input.select();
			this.props.setActiveNote(input.parentElement.parentElement.id);
		}
	}

	blurInput(event, thisId) {
		this.props.noteSubmit(event, thisId);
	}

	render() {
		return this.props.arrayOfNotes.map((element, index)=>{
			let thisId=this.props.lineIndex+'-s'+index;
			let elementToReturn;
			if(element.disabled===true){
				return (
				<div className="disabledNoteBox" key={index} id={this.props.lineIndex+'-s'+index}>
					<div className="disabledNote"></div>
				</div>
				);
				
			}
			else{
				if(element.clicked === false&&element.value==="")
					elementToReturn = <div className = "editableNote"></div>;
				else if (element.clicked === false&&element.value!=="")
					elementToReturn=<div className="enteredNote">{/*note*/}{element.value}</div>;
				else
					elementToReturn = <form onSubmit={(e, element)=>this.props.noteSubmit(e, {thisId})} className = "noteForm" onBlur={(e) => this.blurInput(e,{thisId})} > 
										<input defaultValue = {element.value} ref = {(input) => {this.focus(input)}} onChange={(e)=>this.props.noteChange(e,{thisId})}
										onKeyDown = {(e) => this.props.incOrDecDuration(e, {thisId})} /> 
									</form>;
				return (
					<div className="note" key={index} id={this.props.lineIndex+'-s'+index} onClick={(e) => this.props.noteClick(e,{thisId})}>
						{elementToReturn}
					</div>
				);
			}
		});
	}
};

export default Snote;