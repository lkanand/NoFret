import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TabWriter from "../../components/TabWriter";
import Wrapper from "../../components/Wrapper";
import ScaleTool from "../../components/ScaleTool";
import MIDISounds from 'midi-sounds-react';
import axios from 'axios';
import "./Home.css";

const defaultBPM = 90;
const defaultTimeSig = 4;

class Home extends Component {

	state = {
		scaleType: "major",
		bpm: defaultBPM,
        timeSig: defaultTimeSig,
		stMode: "listen",
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
        tone: 275,
        tabId:"",
        hideToolTip: true
	}

    componentDidMount() {
        const that = this;
        axios.post("/loginCheck").then(response => {
            if(response.data.login === true)
                that.setState({loggedIn: true, username: response.data.username});
        });
        this.tuneStrings(this.state.tuning);
        this.midiSounds.setEchoLevel(0);
    }

    //modal functions

    onCloseModal = () => {
    this.setState({ open: false, password: ""});
    let element = document.getElementById("loginError");
    if(element !== null)
        element.innerHTML = "";
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
            window.location.reload();
        })
        .catch(err => { console.log(err);
        });
    }

  handleLogin = (event) => {
    event.preventDefault();
    document.getElementById("loginError").innerHTML = "";

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
                this.handleLogin(event);
            }
        }).catch(err => {
            console.log(err);
        });
    };

  //music functions

    handleScaleChange = event => {
        this.setState({scaleType: event.target.value});
    };

    handleRootChange = event => {
        this.setState({root: parseInt(event.target.value, 10)})
    };
    
    handleBoardModeChange = event => {
        this.setState({stMode: event.target.value})
    };
    
    handleTuneChange = event => {
        this.tuneStrings(event.target.value)
        this.setState({tuning: event.target.value})
    };

    handleToneChange = event => {
        this.setState({tone: parseInt(event.target.value, 10)})
    };

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

    //database functions
    triggerSaveModal = (title, notes, bpm, timeSig) => {        
        let tabData={
            title, notes: notes, bpm, timeSig
        };
        let that = this;

        if(this.state.tabId === "") {
            console.log("about to make post request");
            axios.post('api/usertabs',tabData)
            .then(response=>{
                that.setState({tabId: response.data._id});
            }).catch(err=>{
                console.log(err);
            });
        }
        else {
            axios.put('api/onetab/'+this.state.tabId,tabData).then(data=>{
            }).catch(err => {
                console.log(err);
            });
        }
    }

    unsaveTab = (tabId) => {
        axios.delete("/api/onetab/"+tabId).then(tab => {
            let projectsCopy = this.state.projects;
            for(var i = 0; i < projectsCopy.length; i++) {
                if(projectsCopy[i].id === tabId)
                    projectsCopy.splice(i, 1);
            }

            if(tabId !== this.state.tabId)
                this.setState({projects: projectsCopy});
            else {
                document.getElementById("tabFormBPM").value=defaultBPM;
                document.getElementById("tabFormTimeSig").value=defaultTimeSig;
                this.setState({projects: projectsCopy, tabId: "", bpm: defaultBPM, timeSig: defaultTimeSig});
            }
        }).catch(err=>console.log(err));
    }

    newTab = () => {
        if(this.state.tabId !== "") {
            document.getElementById("tabFormBPM").value=defaultBPM;
            document.getElementById("tabFormTimeSig").value=defaultTimeSig;
            this.setState({tabId: "", bpm: defaultBPM, timeSig: defaultTimeSig});
        }
    }

    toolTip = () => {
        this.state.hideToolTip ? this.setState({hideToolTip: false}) : this.setState({hideToolTip: true});
    };


  render() {
     const { open } = this.state;
    const style = this.state.hideToolTip ? {display: 'none'} : {};
    return (
    <Wrapper>
        <nav>
            <img className="logo" src="./img/fretlogo4recolor.png" alt="#"/>
            {
                (this.state.loggedIn === false)
                  ? <div className="signInDiv">
                        <button onClick={this.triggerModal}>Sign In</button>
                    </div>
                  : <div className="signedInDiv">
                        <span className="currentUserBox">Welcome, {this.state.username}</span>
                        <button onClick={this.populateProjects}>My Projects</button>
                        <button onClick={this.triggerLogout}>Logout</button>
                    </div>
            }
            
        </nav>

        <section className="StSect">
            <section className="StForm">
                <div className="StBoardInfo">
                    <div>
                        <div>
                            <h3 className="scaleTitle">Scale Tool</h3>
                        </div>
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
                        <button className="scaleToolTip" onClick={this.toolTip}><i className="fas fa-question"></i>
                            <div className="scaleToolTipText" style={style}>
                                <strong>Scale Tool Tips</strong>
                                <ul>
                                    <li>Set desired tuning using the Tunings dropdown menu or tune each string with the up and down arrows to the left of the string.</li>
                                    <li>Set scale to view using the Scale Root and Scale Type dropdown menus.</li>
                                    <li>The root of the selected scale will always appear white, and each note has a unique color.</li>
                                    <li>Click on frets occupied by notes to hear the note in "Listen" mode using the Board Mode dropdown menu.</li>
                                    <li>To add or remove visible notes click on any fret in "Edit" mode.</li>
                                    <li>Frets further down the neck can be viewed by scrolling horizontally.</li>
                                    <li>The guitar tone can be changed using the Guitar Tone dropdown menu.</li>
                                </ul>
                            </div>
                        </button>
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
                            <option value="major">Major</option>
                            <option value="major pent">Major Pentatonic</option>
                            <option value="blues">Blues</option>
                            <option value="minor pent">Minor Pentatonic</option>
                            <option value="natural minor">Natural Minor</option>
                            <option value="dorian">Dorian Mode</option>
                            <option value="mixolydian">Mixolydian Mode</option>
                            <option value="noscale">No Scale</option>
                        </select>
                    </div>
                    
                    <div>
                        <span>Guitar Tone: </span>
                        <select name="tone" onChange={this.handleToneChange}>
                            <option value="275">Clean</option>
                            <option value="291">Overdriven</option>
                            <option value="250">Accoustic</option>
                        </select>
                    </div>

                    <div>
                        <span>Board Mode: </span>
                        <select name="boardMode" onChange={this.handleBoardModeChange}>
                            <option value="listen">Listen</option>
                            <option value="edit">Edit</option>
                        </select>
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
            <ScaleTool scaleType={this.state.scaleType} root={this.state.root} mode={this.state.stMode} openstrings={this.state.openStrings} midi={this.midiSounds} tone={this.state.tone}/>
        </section>
        <div className = "tabWriterContainer">
            <div className = "twCall">
                <h2>Tab Writer</h2>
                <p>Try out your ideas on the page below.<br/>Enter the fret number and duration of the notes you want to play.</p>
            </div>
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
                    <input type="submit" value="Update Tab Settings" />
                </div>
                <div>
                    <button onClick={(event) => this.changeMode(event)}> 
                        <i className = {this.state.editMode ? "fas fa-play" : "fas fa-stop"}></i>
                    </button>
                </div>
            </form>
            <TabWriter openstrings={this.state.openStrings} tabId={this.state.tabId} modalFunction={this.triggerModal} loggedIn={this.state.loggedIn} midi={this.midiSounds} bpm={this.state.bpm} 
            editMode={this.state.editMode} timeSig={this.state.timeSig} tuning={this.state.tuning} newTab={this.newTab} triggerSaveModal={this.triggerSaveModal} tone={this.state.tone} 
            changeMode={this.changeMode} open={this.state.open}/>
            
        </div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} instruments={[291, 250, 275]} /> 
    
        <div>
        <Modal className="loginModal" open={open} onClose={this.onCloseModal} little>
        {
            (this.state.loggedIn === false)
            
               ? <form className="loginForm">
                    <div className="logoDiv"><img className="modalLogo" src="./img/fretlogo4recolor.png" alt="#"/></div>
                    <div className="userInfoDiv">
                    <div className="userLine"><label className="loginLabel">Email</label></div>
                        <input
                            className="inputField"
                            type="text"
                            id="loginFormUsername"
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
                        <button className="signInButton"
                            disabled={!(this.state.username && this.state.password)}
                            onClick={(event) => this.handleLogin(event)}
                            >
                          Sign In
                        </button>
                        
                        <button className="createButton"
                          disabled={!(this.state.username && this.state.password)}
                          onClick={(event) => this.createLogin(event)}
                          >
                          Sign Up
                        </button>
                        
                    </div>
                        <p id="loginError"></p>
                    </div>
                </form>

            : <div className="savedTabs"><div className="titleTabs"><h3>Saved Tabs</h3></div>
                <div className="listBox">
                {
                    (this.state.projects.length>0)
                 ?<ol>
                    {this.state.projects.map((proj, index)=>{
                        return(
                            <div key={index}>
                            <li>
                            <span onClick={()=>this.callTab(proj.id, proj.bpm, proj.timeSig)} id={proj.id}>
                                {proj.title}</span>
                                <button onClick={() => this.unsaveTab(proj.id)}><i class="far fa-trash-alt"></i></button></li>
                            </div>
                            );
                    })}
                    </ol>
                :<h6> No Projects Yet! Let's start tab writing</h6>
                
                    }
                    </div>
                </div>
            }
        </Modal>
      </div>
    </Wrapper>
    );
    }
};

export default Home;