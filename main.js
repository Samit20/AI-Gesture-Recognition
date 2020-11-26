nosex = 0;
nosey = 0;

right_wrist_x = 0;
left_wrist_x = 0;
difference = 0;

function setup() {
    canvas = createCanvas(450, 450);
    canvas.position(800, 100);
    video = createCapture(VIDEO);
    video.size(450, 450);
    video.position(100, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Pose Net has been initiated!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        nosex = results[0].pose.nose.x;
        nosey = results[0].pose.nose.y;
        console.log("nosex = " + nosex + "nosey = " + nosey);
        right_wrist_x = results[0].pose.rightWrist.x;
        left_wrist_x = results[0].pose.leftWrist.x;
        difference = floor(left_wrist_x - right_wrist_x);
        console.log("Right Wrist X = " + right_wrist_x + "Left Wrist X = " + left_wrist_x + "Difference = " + difference);
    }
}

function draw() {
    background('#ffae42');
    square(nosex, nosey, difference);
    document.getElementById("square_side").innerHTML = "Length of the Square is = " + difference + "Px";
    stroke('#ffebcd');
    fill('#ffebcd');
}