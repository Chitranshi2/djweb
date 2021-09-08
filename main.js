song = "";
leftwristy = 0;
leftwristx = 0;
rightwristy = 0;
rightwristx = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotresult);
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill('#25948b');
    stroke("#25948b");
    circle(leftwristx, leftwristy, 20);
    if(rightwristy > 0 && rightwristy <=100)
        {
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
    else if(rightwristy > 100 && rightwristy <=200)
        {
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
        }
     else if(rightwristy > 200 && rightwristy <=300)
        {
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }
     else if(rightwristy > 300 && rightwristy <=400)
        {
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
        }
     else if(rightwristy > 400 && rightwristy <=500)
        {
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }
    
    numberleftwristy = Number(leftwristy);
    removedecimals = floor(numberleftwristy);
    volume = removedecimals / 1000;
    document.getElementById("volume").innerHTML = "volume= " + volume;
    song.setVolume(volume);
}

function preload() {
    song = loadSound("𝘽𝙤𝙣𝙚𝙮 𝙈. - 𝙍𝙖𝙨𝙥𝙪𝙩𝙞𝙣 (𝙨𝙡𝙤𝙬𝙚𝙙 8𝙙)");
}

function play() {
    song.play();
    //song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotresult(results) {
    if (results.length > 0) {
        console.log(results);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("leftwristx = " + leftwristx + "leftwristy=" + leftwristy);
        console.log("rightwristx = " + rightwristx + "rightwristy=" + rightwristy);

    }
}
