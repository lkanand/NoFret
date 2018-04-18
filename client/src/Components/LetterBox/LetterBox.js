import React, {Component} from "react";
import "./LetterBox.css";

class LetterBox extends Component {
  constructor() {
    super();
    this.state = {
      openNotes: []
    };
  }

  	componentDidMount() {
		this.setNotes(this.props.openStrings);
  	}

	componentWillReceiveProps(props) {
		this.setNotes(props.openStrings);
	};

	setNotes = (stringVals) => {
		let openNotes = [];
		stringVals.map(string => {
			const note = string%12;
			if (note === 0) {
				openNotes.push("C");
			} else if (note === 1) {
				openNotes.push("Db");
			} else if (note === 2) {
				openNotes.push("D");
			} else if (note === 3) {
				openNotes.push("Eb");
			} else if (note === 4) {
				openNotes.push("E");
			} else if (note === 5) {
				openNotes.push("F");
			} else if (note === 6) {
				openNotes.push("F#");
			} else if (note === 7) {
				openNotes.push("G");
			} else if (note === 8) {
				openNotes.push("Ab");
			} else if (note === 9) {
				openNotes.push("A");
			} else if (note === 10) {
				openNotes.push("Bb");
			} else if (note === 11) {
				openNotes.push("B");
			}
		})
	this.setState({openNotes: openNotes})
	};

	render() {
    	return (
			<div className="chordLetters">
		        {this.state.openNotes.map(note => {
		          return (
					<div className="letter">{note}</div>
		          );
		        })}
			</div>
    	)
	}
};

export default LetterBox;