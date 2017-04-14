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
        findLocation();
    });
    return snapshotBt;
}

function findLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
    else {
        alert('Your browser doesnt support Geolocation');
    }
}

function showLocation(pos) {
    var lng = pos.coords.longitude;
    var lat = pos.coords.latitude;
    console.log('Latitude : ' + lat + '\n\nLongitude : ' + lng);
    context.font = '20px monospace'
    context.fillStyle = 'red';
    context.fillText('LATITUDE : ' + lat, 40, 25);
    context.fillText('LATITUDE : ' + lng, 40, 60);
}