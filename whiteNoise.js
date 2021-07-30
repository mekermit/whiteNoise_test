let whiteNoise;
let start_Btn;
let eqWhiteNoise;
let fft;
let playing;
let randfr;
let rF;
let frequency;
let freqArray;

function whiteNPlaying() {
    whiteNoise.start();
    playing = true;
}

function whiteNStopped() {
    whiteNoise.stop();
    playing = false;
}

function startBtn() {
    if (playing == false) {
        whiteNPlaying();
        start_Btn.html('stop');
    } else {
        whiteNStopped();
        start_Btn.html('play!');
    }
}

function getGood() {
    if (frequency !== 0) {
        if (frequency === randfr) {
            whiteNoise.stop();
            alert('nice!');
            noLoop();
            window.location.reload();
        } else {
            whiteNoise.stop();
            alert(`nou!, it was ${randfr}Hz`);
            noLoop();
            window.location.reload();
        }
    }
}

function setup() {
    createCanvas(400, 400);

    eqWhiteNoise = new p5.Filter('peaking');
    eqWhiteNoise.res(4.318);
    eqWhiteNoise.gain(20);

    whiteNoise = new p5.Noise('white');
    whiteNoise.disconnect();
    whiteNoise.connect(eqWhiteNoise);
    whiteNoise.amp(0.25);

    freqArray = document.getElementsByName('frequency');
    rF = int(random(1, freqArray.length));
    randfr = int(freqArray[rF].value);

    fft = new p5.FFT();

    start_Btn = createButton('start!');
    start_Btn.mousePressed(startBtn);
}

function draw() {
    frequency = int(document.querySelector('input[name="frequency"]:checked').value);
    eqWhiteNoise.freq(randfr);

    background(0);
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(250);
    strokeWeight(2);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();

    getGood();
}

function loaded() {
}