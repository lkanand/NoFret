import React, { Component } from 'react';
import TabWriter from "../../components/TabWriter";
import ScaleTool from "../../components/ScaleTool";
import MIDISounds from 'midi-sounds-react';
import "./Home.css";

class Home extends Component {

	state = {
		scaleType: "noscale",
		bpm: 100,
		stMode: "edit",
        tuning: "standard",
        root: 0,
        openStrings: []
	}

    componentDidMount() {
        this.tuneStrings(this.state.tuning);
        this.midiSounds.setEchoLevel(0);
    }

    handleScaleChange = event => {
        this.setState({scaleType: event.target.value});
    }

    handleTuneChange = event => {
        this.setState({tuning: event.target.value});
        this.tuneStrings(event.target.value);
    }

    handleBPMChange = event => {
        this.setState({bpm: event.target.value});
    }

    handleRootChange = event => {
        this.setState({root: parseInt(event.target.value)})
    }
    handleBoardModeChange = event => {
        this.setState({stMode: event.target.value})
    }

    tuneStrings = tuning => {
        // 0 = C1 anything below E1 is not supported by our app
        if (tuning === "standard") {
            this.setState({openStrings: [64, 59, 55, 50, 45, 40]});
        } else if (tuning === "drop D") {
            this.setState({openStrings: [64, 59, 55, 50, 45, 38]});
        } else if (tuning === "double drop D") {
            this.setState({openStrings: [62, 59, 55, 50, 45, 38]});
        } else if (tuning === "maj thirds") {
            this.setState({openStrings: [62, 58, 54, 50, 46, 42]});
        } else if (tuning === "all fourths") {
            this.setState({openStrings: [65, 60, 55, 50, 45, 40]});
        } else if (tuning === "aug fourths") {
            this.setState({openStrings: [66, 60, 54, 48, 42, 36]});
        } else if (tuning === "new standard") {
            this.setState({openStrings: [67, 64, 57, 50, 43, 36]});
        } else if (tuning === "open A") {
            this.setState({openStrings: [64, 57, 52, 49, 45, 40]});
        } else if (tuning === "slide open A") {
            this.setState({openStrings: [64, 61, 57, 52, 45, 40]});
        } else if (tuning === "open C") {
            this.setState({openStrings: [64, 60, 55, 48, 43, 36]});
        } else if (tuning === "open D") {
            this.setState({openStrings: [62, 57, 54, 50, 45, 38]});
        } else if (tuning === "open E") {
            this.setState({openStrings: [64, 59, 56, 52, 47, 40]});
        } else if (tuning === "open G") {
            this.setState({openStrings: [62, 59, 55, 50, 43, 38]});
        } else if (tuning === "DADGAD") {
            this.setState({openStrings: [62, 57, 55, 50, 45, 38]});
        } else if (tuning === "DADADD") {
            this.setState({openStrings: [62, 62, 57, 50, 45, 38]});
        } else if (tuning === "standard Eb") {
            this.setState({openStrings: [63, 58, 54, 49, 44, 39]});
        } else if (tuning === "standard D") {
            this.setState({openStrings: [62, 57, 53, 48, 43, 38]});
        }
    }


    incrementValue = (event, stringno) => {
        event.preventDefault()
        this.setState((prevState) => {
            let tunedStrings = prevState.openStrings;
            const newval = tunedStrings[stringno] + 1;
            tunedStrings.splice(stringno, 1, newval);
            return {stringvalue: tunedStrings}
        })
    }

    decrementValue = (event, stringno) => {
        event.preventDefault()
        this.setState((prevState) => {
            let tunedStrings = prevState.openStrings;
            const newval = tunedStrings[stringno] - 1;
            if (newval > -1) {
                tunedStrings.splice(stringno, 1, newval);
            }
            // console.log(tunedStrings);
            return {stringvalue: tunedStrings}
        })
    }

  render() {
    return (
    <div>

        <section className="StSect">
            <form className="StForm">
                <div className="StBoardInfo">
                    <span>Tuning: </span>
                    <select name="tuning" onChange={this.handleTuneChange}>
                        <option value="standard">Standard</option>
                        <option value="drop D">Drop D</option>
                        <option value="standard Eb">Standard (Eb)</option>
                        <option value="standard D">Standard (D)</option>
                        <option value="new standard">New Standard</option>
                        <option value="open A">Open A</option>
                        <option value="slide open A">Slide Open A</option>
                        <option value="open C">Open C</option>
                        <option value="open D">Open D</option>
                        <option value="open E">Open E</option>
                        <option value="open G">Open G</option>
                        <option value="double drop D">Double Drop D</option>
                        <option value="maj thirds">Major Thirds</option>
                        <option value="all fourths">All Fourths</option>
                        <option value="aug fourths">Augmented Fourths</option>
                        <option value="DADGAD">DADGAD</option>
                        <option value="DADADD">DADADD</option>
                    </select>
                    <span>Scale Root: </span> 
                    <select name="note" onChange={this.handleRootChange}>
                        <option value="0">C</option>
                        <option value="1">Db</option>
                        <option value="2">D</option>
                        <option value="3">Eb</option>
                        <option value="4">E</option>
                        <option value="5">F</option>
                        <option value="6">Gb</option>
                        <option value="7">G</option>
                        <option value="8">Ab</option>
                        <option value="9">A</option>
                        <option value="10">Bb</option>
                        <option value="11">B</option>
                    </select>
                    <span>Scale Type: </span> 
                    <select name="scaleType" onChange={this.handleScaleChange}>
                        <option value="noscale">No Scale</option>
                        <option value="major">Major</option>
                        <option value="major pent">Major Pentatonic</option>
                        <option value="blues">Blues</option>
                        <option value="minor pent">Minor Pentatonic</option>
                        <option value="natural minor">Natural Minor</option>
                        <option value="dorian">Dorian Mode</option>
                        <option value="mixolydian">Mixolydian Mode</option>
                    </select>
                    <span>Board Mode: </span>
                    <form name="boardMode" onChange={this.handleBoardModeChange}>
                        <input type="radio" name="mode" value="edit" checked="checked"/>Edit
                        <input type="radio" name="mode" value="listen"/>Listen
                    </form>
                </div>

                <div className="StTuningPegs">                    
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 0)}><i class="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 0)}><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 1)}><i class="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 1)}><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 2)}><i class="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 2)}><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 3)}><i class="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 3)}><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 4)}><i class="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 4)}><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 5)}><i class="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 5)}><i class="fas fa-chevron-down"></i></button>
                    </div>
                </div>

            </form>
            <ScaleTool scaleType={this.state.scaleType} root={this.state.root} mode={this.state.stMode} openstrings={this.state.openStrings} midi={this.midiSounds}/>
        </section>


        <form> 
            <span> Tuning: </span> 
            <select name="tuning" onChange={this.handleTuneChange}>
                <option value="standard">Standard</option>
                <option value="drop D">Drop D</option>
                <option value="standard Eb">Standard (Eb)</option>
                <option value="standard D">Standard (D)</option>
                <option value="new standard">New Standard</option>
                <option value="open A">Open A</option>
                <option value="slide open A">Slide Open A</option>
                <option value="open C">Open C</option>
                <option value="open D">Open D</option>
                <option value="open E">Open E</option>
                <option value="open G">Open G</option>
                <option value="double drop D">Double Drop D</option>
                <option value="maj thirds">Major Thirds</option>
                <option value="all fourths">All Fourths</option>
                <option value="aug fourths">Augmented Fourths</option>
                <option value="DADGAD">DADGAD</option>
                <option value="DADADD">DADADD</option>
            </select>
            <span> Tempo: </span>
            <input type="number" name="bpm" min="1" max="300" onChange={this.handleBPMChange} />BPM
        </form>
		<TabWriter openstrings={this.state.openStrings} midi={this.midiSounds}/>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} instruments={[275]} /> 
	</div>
    );
  }
};

export default Home;