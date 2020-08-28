import React, {Component} from 'react';



class AudioVisualiser extends Component {
    // need to get a reference to the <canvas> element so that we can draw on it later.
    // In the constructor create the reference using React.createRef() and add the ref
    // attribute to the <canvas> element.
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    //The draw function needs to run every time the audioData is updated. Add the following function to the component:
    componentDidUpdate() {
        this.draw(); // remember that 'draw' is our function we created below...
    }

    // The idea is to take the audioData we created in the previous component and draw a line from left to right
    // between each data point in the array.
    //
    // Start with a new function called draw. This function will be called each
    // time we get new data from the analyser. We start by setting up the variables we want to use:

    draw() {
        const {audioData} = this.props; //the audioData from the props and its length
        const canvas = this.canvas.current; //the canvas from the ref
        const height = canvas.height; //the height and width of the canvas
        const width = canvas.width;
        const context = canvas.getContext('2d'); // a 2d drawing context from the canvas
        let x = 0; //will be used to track across the canvas
        const sliceWidth = (width * 1.0) / audioData.length; //the amount we will move to the right every time we draw

        // First setting our drawing style, in this case setting a line width of 2 and stroke style to the colour
        // black. Then we clear previous drawings from the canvas.

        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.clearRect(0, 0, width, height);
        // Next, begin the path we are going to draw and move the drawing position to halfway down the left side of the
        // canvas.
        context.beginPath();
        context.moveTo(0, height / 2);
        // Loop over the data in audioData. Each data point is between 0 and 255. To normalise this to our canvas we
        // divide by 255 and then multiply by the height of the canvas. We then draw a line from the previous point to
        // this one and increment x by the sliceWidth.
        for (const item of audioData) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y);
            x += sliceWidth;
        }
        // Finally we draw a line to the point halfway down the right side of the canvas and direct the canvas to
        // colour the entire path.
        context.lineTo(x, height / 2);
        context.stroke();

    }

    render() {
        // We want to draw onto a canvas...
        return <canvas width="300" height="300" ref={this.canvas}/>;
    }
}

export default AudioVisualiser;