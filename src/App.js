import React, { Component } from 'react';
import './App.css';
import AudioAnalyser from "./AudioAnalyser";
import Pitchfinder from "pitchfinder";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            audio: null
        };
        //We're going to use this toggle method with the button in the interface.
        // To do so, we'll need to bind its context to the component.
        // It's then referenced in the render function
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }

    // Below method uses async await to getUserMedia and set audio stream in state
    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        this.setState({audio});
    }


    //Below will stop audio capture
    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({audio: null});
    }

    //now make a toggle method
    toggleMicrophone() {
        if (this.state.audio) {
            this.stopMicrophone();
        } else {
            this.getMicrophone();
        }
    }



    render() {
        return (
            <div className="App">
                <div className="App">
                    <div className="controls">
                        <button onClick={this.toggleMicrophone}>
                            {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
                        </button>
                    </div>
                    {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
                    {/*Here we're including the analyser only if the state contains the audio stream*/}
                </div>
            </div>
        );
    }
}

export default App;