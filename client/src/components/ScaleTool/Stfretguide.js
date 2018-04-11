import React, {Component} from "react";

class Stfretguide extends (Component) {

	state = {
		frets: ["0", " ", " ", "3", " ", "5", " ", "7", " ", "9", " ", " ", "12", " ", " ", "15", " ", "17", " ", "19", " ", "21", " ", " ", "24"]
	}

	// componentDidMount() {
	// 	this.makeFretNums();
	// }
 
	// makeFretNums = () => {
	// 	for (let i=0;i<25;i++) {
	// 		this.state.frets.push(i);
	// 	}
	// }

	render() {
		return (
			<span className="stNeck">
	            {this.state.frets.map(fret => {
	            	return (
						<div className="stFretGuide">
	            			{fret}
						</div>	
	            	);
	            })}
            </span>
		)
	}
}

export default Stfretguide;