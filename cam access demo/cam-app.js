var video;
var canvas;
var context;
window.addEventListener('load', function () {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    //setting onclick listeners to the control buttons
    document.getElementById('startBt').addEventListener('click', startApp);
});

function startApp() {
    //for different browser supports
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedian || navigator.oGetUserMedia || navigator.msGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            video: true
        }, streamCam, error);
    }
    else {
        alert('Your browser doesnt holds the support required for this app');
    }
}

function streamCam(stream) {
    prepareControls();
    video.src = window.URL.createObjectURL(stream);
    video.play();
}

function error(err) {
    alert(err.name + '\nThis app needs the permission to get accesss to your web cam');
}

function prepareControls() {
    document.getElementById('controls').appendChild(generateSnapBtn());
}

function generateSnapBtn() {
    var snapshotBt = document.createElement('BUTTON');
    snapshotBt.innerHTML = 'TAKE SNAPSHOT';
    snapshotBt.addEventListener('click', function () {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        context.drawImage(video, 0, 0);
    });
    return snapshotBt;
}