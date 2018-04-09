import React, { Component } from "react";
import "./Snote.css";

class Snote extends Component {
	focus(input) {
		if(input !== null)
			input.focus();
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
					elementToReturn=<div className="enteredNote">{element.value}</div>;
				else if (element.clicked===true&&element.value===""&&element.disabled===false)
					elementToReturn = <form onSubmit={(e)=>this.props.noteSubmit(e, {thisId})} className = "newNote"> 
										<input defaultValue = {element.value} ref = {(input) => {this.focus(input)}} onBlur={(e) => this.props.noteSubmit(e,{thisId})} onChange={(e)=>this.props.noteChange(e,{thisId})}/> 
									</form>;
				else
					elementToReturn = <form onSubmit={(e)=>this.props.noteSubmit(e, {thisId})} className = "noteForm"> 
										<input defaultValue = {element.value} ref = {(input) => {this.focus(input)}} onBlur={(e) => this.props.noteSubmit(e,{thisId})} onChange={(e)=>this.props.noteChange(e,{thisId})}/> 
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