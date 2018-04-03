function getDocument(url) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushDoc(templateXHR.responseXML);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}
 
function pushDoc(document) {
    navigationDocument.pushDocument(document);
}

function play(playlistName) {
    var player = new Player();
    player.playlist = new Playlist();
    var playlistUrl = "https://ott-channel-engine.herokuapp.com/live/master.m3u8";
    if (playlistName) {
        playlistUrl += "?playlist=" + playlistName;
    }
    var video = new MediaItem('video', playlistUrl)
    video.title = "test";
    player.playlist.push(video);
    player.play();   
}
 
App.onLaunch = function(options) {
    var templateURL = 'http://localhost:8081/eyevinntv-main.html';
    getDocument(templateURL);
}
 
App.onExit = function() {
    console.log('App finished');
}

