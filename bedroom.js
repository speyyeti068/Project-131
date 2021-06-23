img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img,0,0,380,380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(img,gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Object(s) Being Detected";
            document.getElementById("numberOfObjects").innerHTML = "Number Of Objects Detected Are " + objects.length

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);  
        }
    }
}