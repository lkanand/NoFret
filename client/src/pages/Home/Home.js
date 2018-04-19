import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TabWriter from "../../components/TabWriter";
import Wrapper from "../../components/Wrapper";
import ScaleTool from "../../components/ScaleTool";
import MIDISounds from 'midi-sounds-react';
import axios from 'axios';
import "./Home.css";

class Home extends Component {

	state = {
		scaleType: "noscale",
		bpm: 120,
        timeSig: 4,
		stMode: "edit",
        tuning: "standard",
        root: 0,
        openStrings: [],
        editMode: true,
        btnMessage: "Play",
        open: false,
        username: "",
        password: "",
        loggedIn: false,
        projects:[],
        tabId:""
	}

    componentDidMount() {
        this.tuneStrings(this.state.tuning);
        this.midiSounds.setEchoLevel(0);
    }

    //modal functions

    onCloseModal = () => {
    this.setState({ open: false, username: "", password: ""});
    document.getElementById("loginError").innerHTML = "";
    }

    triggerModal = () => {
    this.setState({ open: true });
    }

    populateProjects = () => {
        this.setState({ open: true });

        axios.get('api/usertabs')
      .then(res =>{
        const tablist=[];
        let cleanTitle="";
        res.data.tabs.forEach(tabob=>{
            if (tabob.title===""){
                cleanTitle="Untitled";
            }
            else{
                cleanTitle=tabob.title;
            }

            
            let tempArray={
                id:tabob._id,
                title:cleanTitle,
                bpm:tabob.bpm,
                timeSig:tabob.timeSig
            }
            tablist.push(tempArray);
        });
        this.setState({projects:tablist});
      })
      .catch(err => console.log(err));
  };

    callTab=(id,beat,time)=>{
        this.setState({open: false,tabId:id,bpm:beat,timeSig:time});
        document.getElementById("tabFormBPM").value=beat;
        document.getElementById("tabFormTimeSig").value=time;
    }

    //login function
    handleLoginChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
        });
      }

    triggerLogout = () => {
        axios.delete('api/auth')
        .then(user=>{
            this.setState({ username:"",password:"",loggedIn: false });
        })
        .catch(err => { console.log(err);
        });
    }

  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    axios.post('/api/auth', {
      username,
      password
    })
      .then(info => {
        document.getElementById("loginError").innerHTML = "";
        this.setState({loggedIn:true, open:false, password: ""});
      })
      .catch(err => {
        document.getElementById("loginError").innerHTML = "Invalid username or password";
      });
  }

    createLogin = (event) => {
        event.preventDefault();
        document.getElementById("loginError").innerHTML = "";

        const { username, password } = this.state;
        
        axios.post('/api/users', {
          username,
          password
        }).then(response => {
            if(response.data.hasOwnProperty("errors"))
                document.getElementById("loginError").innerHTML = response.data.message.split(":")[2].substr(1);
            else if(response.data.hasOwnProperty("code") && response.data.code === 11000)
                document.getElementById("loginError").innerHTML = "An account with that email already exists";
            else {
                console.log("we made it!");         
                this.handleLogin(event);
            }
        }).catch(err => {
            console.log(err);
        });
    }

  //music functions

    handleScaleChange = event => {
        this.setState({scaleType: event.target.value});
    }

    handleRootChange = event => {
        this.setState({root: parseInt(event.target.value, 10)})
    }
    handleBoardModeChange = event => {
        this.setState({stMode: event.target.value})
    }
    handleTuneChange = event => {
        this.tuneStrings(event.target.value)
        this.setState({tuning: event.target.value})
    }

    submitTabForm = event => {
        event.preventDefault();
        let bpm = parseInt(this.bpm.value, 10);
        let timeSig = parseInt(this.timeSig.value, 10);

        if(bpm < 1)
            bpm = 1;
        else if(bpm > 300)
            bpm = 300;

        if(timeSig < 1)
            timeSig = 1;
        else if(timeSig > 8)
            timeSig = 8;

        this.bpm.value = bpm;
        this.timeSig.value = timeSig;
        this.setState({bpm, timeSig});
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
            return {stringvalue: tunedStrings}
        })
    }

    changeMode =(event)=>{
        event.preventDefault();
        let tempMode=!this.state.editMode;
        let tempMsg="Play";

        if (tempMode===false){
          tempMsg="Stop";
          this.bpm.value = this.state.bpm;
          this.timeSig.value = this.state.timeSig; 
        }
            
        this.setState({editMode:tempMode, btnMessage:tempMsg});
    }

    

  render() {
     const { open } = this.state;
    return (
    <Wrapper>
        <nav>
            <img className="logo" src="./img/fretlogoForUse.png" alt="#"/>
            {
                (this.state.loggedIn === false)
                  ? <div className="signInDiv">
                        <button onClick={this.triggerModal}>Sign In</button>
                    </div>
                  : <div className="signedInDiv">
                        <div className="currentUserBox">Logged in as {this.state.username}</div>
                        <button onClick={this.populateProjects}>My Projects</button>
                        <button onClick={this.triggerLogout}>Logout</button>
                    </div>
            }
            
        </nav>

        <section className="StSect">
            <section className="StForm">
                <div className="StBoardInfo">
                    <div>
                        <span>Tuning: </span>
                        <select name="tuning" onChange={this.handleTuneChange}>
                                <option value="standard">Standard</option>
                                <option value="standard Eb">Standard (Eb)</option>
                                <option value="standard D">Standard (D)</option>
                                <option value="drop D">Drop D</option>
                                <option value="double drop D">Double Drop D</option>
                                <option value="new standard">New Standard</option>
                                <option value="open A">Open A</option>
                                <option value="slide open A">Slide Open A</option>
                                <option value="open C">Open C</option>
                                <option value="open D">Open D</option>
                                <option value="open E">Open E</option>
                                <option value="open G">Open G</option>
                                <option value="maj thirds">Major Thirds</option>
                                <option value="all fourths">All Fourths</option>
                                <option value="aug fourths">Augmented Fourths</option>
                                <option value="DADGAD">DADGAD</option>
                                <option value="DADADD">DADADD</option>
                        </select>
                    </div>
                    
                    <div>
                        <span>Scale Root: </span> 
                        <br/> 
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
                    </div>
                    
                    <div>
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
                    </div>
                    
                    <div>
                        <span>Board Mode: </span>
                        <form name="boardMode" onChange={this.handleBoardModeChange}>
                            <input type="radio" name="mode" value="edit" defaultChecked="checked"/><label htmlFor="edit">Edit </label> 
                            <input type="radio" name="mode" value="listen"/><label htmlFor="edit">listen </label>
                        </form>
                    </div>

                </div>

                <div className="StTuningPegs">                    
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 0)}><i className="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 0)}><i className="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 1)}><i className="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 1)}><i className="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 2)}><i className="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 2)}><i className="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 3)}><i className="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 3)}><i className="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 4)}><i className="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 4)}><i className="fas fa-chevron-down"></i></button>
                    </div>
                    <div className = "tuningPeg">
                        <button onClick={(e) => this.incrementValue(e, 5)}><i className="fas fa-chevron-up"></i></button>
                        <button onClick={(e) => this.decrementValue(e, 5)}><i className="fas fa-chevron-down"></i></button>
                    </div>
                </div>

            </section>
            <ScaleTool scaleType={this.state.scaleType} root={this.state.root} mode={this.state.stMode} openstrings={this.state.openStrings} midi={this.midiSounds}/>
        </section>
        <div className = "tabWriterContainer">
            <form onSubmit = {(event) => this.submitTabForm(event)} className = "tabPrefDiv">
                <div className = {this.state.editMode ? "" : "noClick"}>
                    <span>&nbsp;Tempo: &nbsp;&nbsp;</span>
                    <input type="number" id="tabFormBPM" name="bpm" defaultValue = {this.state.bpm} ref={(element) => {this.bpm = element}} /><span>BPM </span>
                </div>
                <div className = {this.state.editMode ? "" : "noClick"}>
                    <span>&nbsp;&nbsp;Time Sig: &nbsp;</span>
                    <input type="number" id="tabFormTimeSig" name="timeSig" defaultValue = {this.state.timeSig} ref={(element) => {this.timeSig = element}} /><span>/ 4&nbsp;</span>
                </div>
                <div className = {this.state.editMode ? "" : "noClick"}>
                    <input type="submit" value="Submit Tab Preferences" />
                </div>
                <div>
                    <button onClick={(event) => this.changeMode(event)}> 
                        <i className = {this.state.editMode ? "fas fa-play" : "fas fa-stop"}></i>
                    </button>
                </div>
            </form>
            <TabWriter openstrings={this.state.openStrings} tabId={this.state.tabId} modalFunction={this.triggerModal} loggedIn={this.state.loggedIn} midi={this.midiSounds} bpm={this.state.bpm} editMode={this.state.editMode} timeSig={this.state.timeSig} tuning={this.state.tuning}/>
            
        </div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} instruments={[275]} /> 
    
        <div>
        <Modal className="loginModal" open={open} onClose={this.onCloseModal} little>
        {
            (this.state.loggedIn === false)
            
               ? <form className="loginForm">
                    <div className="userLine"><label className="loginLabel">Email</label></div>
                        <input
                            className="inputField"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleLoginChanged}
                            name="username"
                          />
                    <div className="passLine"><label className="loginLabel">Password</label></div>
                        <input
                            className="inputField"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleLoginChanged}
                            name="password"
                          />
                    <div className="buttonBox">
                        <button className="createButton"
                          disabled={!(this.state.username && this.state.password)}
                          onClick={(event) => this.createLogin(event)}
                          >
                          Create Account
                        </button>
                        <button 
                            disabled={!(this.state.username && this.state.password)}
                            onClick={(event) => this.handleLogin(event)}
                            >
                          Login to Account
                        </button>
                        <p id="loginError"></p>
                    </div>
                </form>

            : <div>My Projects
                <ol>
                 {
                    this.state.projects.map(proj=>{
                        return(
                            <div>
                            <li>
                            <span onClick={()=>this.callTab(proj.id, proj.bpm, proj.timeSig)} key= {proj.id} id={proj.id}>
                                {proj.title}</span>
                                <button>X</button></li>
                            </div>
                            );
                    })
                }
                    </ol>
                </div>
            }
        </Modal>
      </div>
    </Wrapper>
    );
    }
};

export default Home;