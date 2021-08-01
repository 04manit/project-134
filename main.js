objectDetector = "";
let img_1 = "";
objects = [];
status = "";
function preload() {
    img_1 = loadImage('baby 2.jfif');
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting baby";
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img_1, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(img_1, 0, 0, 640, 420);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (var i = 0; i < objects.length; i++) {
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby detected";
                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }else{
                document.getElementById("status").innerHTML = "Baby not detected";
                document.getElementById("sound").play();
            }
        }
    }
}