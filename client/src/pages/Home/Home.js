import React, { Component } from 'react';
import TabWriter from "../../components/TabWriter";
import ScaleTool from "../../components/ScaleTool";

class Home extends Component {

	state = {
		scaleType: "major",
		bpm: 100,
		stState: "listen",
        tuning: "standard",
        root: 0,
        openStrings: []
	}

    componentDidMount() {
        this.tuneStrings(this.state.tuning);
    }

    handleScaleChange = event => {
        console.log(event.target.value);
        this.setState({scaleType: event.target.value});
    }

    handleTuneChange = event => {
        // rerendering before state is changed
        console.log(event.target.value);
        this.setState({tuning: event.target.value});
        this.tuneStrings(event.target.value);
    }

    handleBPMChange = event => {
        console.log(event.target.value);
        this.setState({bpm: event.target.value});
    }

    handleRootChange = event => {
        console.log(event.target.value);
        this.setState({root: parseInt(event.target.value)})
    }

    tuneStrings = tuning => {
        // 0 = C1 anything below E1 is not supported by our app
        if (tuning === "standard") {
            this.setState({openStrings: [40, 35, 31, 26, 21, 16]});
        } else if (tuning === "drop D") {
            this.setState({openStrings: [40, 35, 31, 26, 21, 14]});
        } else if (tuning === "double drop D") {
            this.setState({openStrings: [38, 35, 31, 26, 21, 14]});
        } else if (tuning === "maj thirds") {
            this.setState({openStrings: [38, 34, 30, 26, 22, 18]});
        } else if (tuning === "all fourths") {
            this.setState({openStrings: [41, 36, 31, 26, 21, 16]});
        } else if (tuning === "aug fourths") {
            this.setState({openStrings: [42, 36, 30, 24, 18, 12]});
        } else if (tuning === "new standard") {
            this.setState({openStrings: [43, 40, 33, 26, 19, 12]});
        } else if (tuning === "open A") {
            this.setState({openStrings: [40, 33, 28, 25, 21, 16]});
        } else if (tuning === "slide open A") {
            this.setState({openStrings: [40, 37, 33, 28, 21, 16]});
        } else if (tuning === "open C") {
            this.setState({openStrings: [40, 36, 31, 24, 19, 12]});
        } else if (tuning === "open D") {
            this.setState({openStrings: [38, 33, 30, 26, 21, 14]});
        } else if (tuning === "open E") {
            this.setState({openStrings: [40, 35, 32, 28, 23, 16]});
        } else if (tuning === "open G") {
            this.setState({openStrings: [38, 35, 31, 26, 19, 14]});
        } else if (tuning === "DADGAD") {
            this.setState({openStrings: [38, 33, 31, 26, 21, 14]});
        } else if (tuning === "DADADD") {
            this.setState({openStrings: [38, 38, 33, 26, 21, 14]});
        } else if (tuning === "standard Eb") {
            this.setState({openStrings: [39, 34, 30, 25, 20, 15]});
        } else if (tuning === "standard D") {
            this.setState({openStrings: [38, 33, 29, 24, 19, 14]});
        }
    }

  render() {
    return (
	<div>
    	<nav> 
    		Scale: 
            <select name="note" onChange={this.handleRootChange}>
                <option value="0">C</option>
                <option value="1">Db</option>
                <option value="2">D</option>
                <option value="3">Eb</option>
                <option value="4">E</option>
                <option value="5">F</option>
                <option value="6">F#</option>
                <option value="7">G</option>
                <option value="8">Ab</option>
                <option value="9">A</option>
                <option value="10">Bb</option>
                <option value="11">B</option>
            </select>
    		<select name="scaleType" onChange={this.handleScaleChange}>
    			<option value="major">Major</option>
    			<option value="major pent">Major Pentatonic</option>
    		</select>
    		Tuning: 
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
    		Tempo: 
    		<input type="number" name="bpm" placeholder="100" onChange={this.handleBPMChange}></input>BPM
    	</nav>
		<ScaleTool scaleType={this.state.scaleType} tuning={this.state.tuning} root={this.state.root} openstrings={this.state.openStrings}/>
		<TabWriter />
	</div>
    );
  }
};

export default Home;