function readFile(url, onComplete) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4){
            onComplete(xmlhttp.responseText)
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

var video_paths = [];

readFile(VIDEO_PATH + '/' + VIDEO_LIST_FILENAME, data => {
    video_paths = data.split("\n").filter(filename => filename.trim());
});

$(document).ready(function() {
    var video = $("#video");

    var idleTime = 0;
    var videoPlaying = false;

    video.css("display", "none");

    video.on('ended', function()
    {
        toggleVideo(false);
    });

    function toggleVideo(visible) {
        if (visible) {
            video.fadeIn(FADE_DURATION);
            video[0].setAttribute('src', video_paths[0]);
            video[0].setAttribute('type', 'video/mp4');
            video[0].currentTime = 0;
            video[0].load();
            video[0].play();
            videoPlaying = true;
        }
        else {
            video.fadeOut(FADE_DURATION);
            videoPlaying = false;
        }
    }

    function timerIncrement() {
        if (videoPlaying == false) {
            if (idleTime >= TIMEOUT) {
                idleTime = 0;
                toggleVideo(true);
            }
            else {
                idleTime = idleTime + 1;
            }
        }
    }

    function onUserInput() {
        idleTime = 0;
        if (videoPlaying) toggleVideo(false);
    }

    //Increment the idle time counter every second.
    var idleInterval = setInterval(timerIncrement, 1000);

    $(this).mousemove(function (e) {
        onUserInput();
    });

    $(this).keypress(function (e) {
        onUserInput();
    });
});


