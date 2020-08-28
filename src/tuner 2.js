import "p5/lib/addons/p5.sound";
import p5 from "p5";
import ml5 from 'ml5';

let pitch;
let mic;
let freq = 0;
let threshold = 1;

let notes = [
    {
        note: 'A',
        freq: 440
    },
    {
        note: 'E',
        freq: 329.6276
    },
    {
        note: 'C',
        freq: 261.6256
    },
    {
        note: 'G',
        freq: 391.9954
    }
];

export default function sketch(p) {
    p.setup = function () {
        p.createCanvas(400, 400);
        p.audioContext = getAudioContext();
        mic = new p5.AudioIn();
        mic.start(p.listening);
    };
    p.listening= function () {
        console.log('listening');
        pitch = ml5.pitchDetection(ml5.model_url, audioContext, mic.stream, modelLoaded);
    };
    p.modelLoaded = function () {
        console.log("Model Loaded!");
    }

    p.pitch.getPitch(function(err, frequency) {
        console.log(frequency);
    });

}



// function draw() {
//     background(0);
//     textAlign(CENTER, CENTER);
//     fill(255);
//     textSize(32);
//     text(freq.toFixed(2), width / 2, height - 150);
//
//     let closestNote = -1;
//     let recordDiff = Infinity;
//     for (let i = 0; i < notes.length; i++) {
//         let diff = freq - notes[i].freq;
//         if (abs(diff) < abs(recordDiff)) {
//             closestNote = notes[i];
//             recordDiff = diff;
//         }
//     }
//
//     textSize(64);
//     text(closestNote.note, width / 2, height - 50);
//
//     let diff = recordDiff;
//     // let amt = map(diff, -100, 100, 0, 1);
//     // let r = color(255, 0, 0);
//     // let g = color(0, 255, 0);
//     // let col = lerpColor(g, r, amt);
//
//     let alpha = map(abs(diff), 0, 100, 255, 0);
//     rectMode(CENTER);
//     fill(255, alpha);
//     stroke(255);
//     strokeWeight(1);
//     if (abs(diff) < threshold) {
//         fill(0, 255, 0);
//     }
//     rect(200, 100, 200, 50);
//
//     stroke(255);
//     strokeWeight(4);
//     line(200, 0, 200, 200);
//
//     noStroke();
//     fill(255, 0, 0);
//     if (abs(diff) < threshold) {
//         fill(0, 255, 0);
//     }
//     rect(200 + diff / 2, 100, 10, 75);
// }

// function modelLoaded() {
//     console.log('model loaded');
//     pitch.getPitch(gotPitch);
// }
//
// function gotPitch(error, frequency) {
//     if (error) {
//         console.error(error);
//     } else {
//         //console.log(frequency);
//         if (frequency) {
//             freq = frequency;
//         }
//         pitch.getPitch(gotPitch);
//     }
// }