import React, {Component} from 'react';
import AudioVisualiser from "./AudioVisualiser";

//When the component mounts we're going to setup the Web Audio API objects.
// First we create a new AudioContext (Safari still only supports the webkit prefixed version of this, sadly).
// Then we'll create an AnalyserNode that will do the heavy lifting for us.

class AudioAnalyser extends Component {
    constructor(props) {
        // We'll initialise the state of the component in the constructor,
        // with an empty Uint8Array and also bind the scope of the tick function to the component.
        super(props);
        this.state = { audioData: new Uint8Array(0) };
        this.tick = this.tick.bind(this);
    }

    //We passed the media stream from the microphone into the component as a prop
    // and we need to turn it into a source for the Web Audio API.
    // To do this, call createMediaStreamSource on the AudioContext object,
   // passing in the stream. Once we have the source we can then connect the analyser.

    componentDidMount() {
        this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.tick);
        // above we're kicking off the animation loop in componentDidMount...
    }

    // This still isn't doing any analysis for us yet.
    // For that, we'll need to call upon the AnalyserNode's
    // getByteTimeDomainData method every time we want to update the visualisation.
    // Since we will be animating this visualisation, we'll call upon the browser's
    // requestAnimationFrame API to pull the latest audio data from the AnalyserNode
    // everytime we want to update the visualisation.

    //To do this, we'll create a method that will be called every time requestAnimationFrame runs.
    // The function will copy the current waveform as an array of integers, from the AnalyserNode into the dataArray.
    // It will then update the audioData property in the component's state with the dataArray.
    // Finally, it will call on requestAnimationFrame again to request the next update.

    tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
    }

    // also need to release all release all the resources if we remove the component. Create a componentWillUnmount
    // method that cancels the animation frame and disconnects the audio nodes.

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    // To look at the data we're producing, we obv need a render function...

    render() {
       // return <textarea value={this.state.audioData} />;
        // Above was just a test to see values on screen...
        // Below we define a render method that renders the <AudioVisualiser> and passes the audioData from the state as a property.
        return <AudioVisualiser audioData={this.state.audioData} />;
    }
}

export default AudioAnalyser;