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
var play_index = -1;
var play_time = 0;
var idleTime = 0;
var videoPlaying = false;

readFile(VIDEO_PATH + '/' + VIDEO_LIST_FILENAME, data => {
    video_paths = data.split("\n").filter(filename => filename.trim()).map(filename => VIDEO_PATH + '/' + filename);
});

$(document).ready(function() {
    var adblock = $("#adblock");
    var video = $("#video");

    adblock.css("display", "none");

    function startVideo() {
        play_time = 0;
        toggleVideo(true);
        nextVideo();
    }

    video.on('ended', function()
    {
        if (play_time > AD_BLOCK_DURATION) toggleVideo(false);
        else nextVideo();
    });

    function nextVideo() {
        play_index = (play_index + 1) % video_paths.length;
        video[0].setAttribute('src', video_paths[play_index]);
        video[0].setAttribute('type', 'video/mp4');
        video[0].currentTime = 0;
        video[0].load();
        video[0].play();
    }

    function toggleVideo(visible) {
        if (visible) {
            adblock.fadeIn(FADE_DURATION);
            videoPlaying = true;
        }
        else {
            adblock.fadeOut(FADE_DURATION);
            videoPlaying = false;
        }
    }

    function timerIncrement() {
        if (videoPlaying == false) {
            if (idleTime >= TIMEOUT) {
                idleTime = 0;
                startVideo();
            }
            else {
                idleTime += 1;
            }
        }
        else {
            play_time += 1;
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