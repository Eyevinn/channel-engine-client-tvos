var baseUrl;

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
    player.playlist.push(video);
    player.play();   
}

function updateBackgroundImage(channelName) {
    var imgDeckElement = getActiveDocument().getElementById('background-images');
    imgDeckElement.innerHTML = '';
    var imageUrls = getBackgroundImagesForChannel(channelName);
    imageUrls.forEach(function(imageUrl) {
        addImageToImageDeck(imgDeckElement, imageUrl);
    });
}

function getBackgroundImagesForChannel(channelName) {
    var hiddenNodes = getActiveDocument().getElementById('background-images').parentNode.getElementsByTagName('hidden');
    for (var i=0;i<hiddenNodes.length;i++) {
        var hiddenElement = hiddenNodes.item(i);
        if (hiddenElement.getAttribute('channel') == channelName) {
            var imageUrls = [];
            var imgElements = hiddenElement.getElementsByTagName('img');
            for (var j=0;j<imgElements.length;j++) {
                imageUrls.push(imgElements.item(j).getAttribute('src'));
            }
            return imageUrls;
        }
    }
    return [];
}

function addImageToImageDeck(imageDeckElement, imageUrl) {
    var imgElement = getActiveDocument().createElement("img");
    imageDeckElement.appendChild(imgElement);
    imgElement.setAttribute('src', imageUrl);
}
 
App.onLaunch = function(options) {
    baseUrl = options.BASEURL;
    var templateURL = baseUrl + '/eyevinntv-main.html';
    getDocument(templateURL);
}
 
App.onExit = function() {
    console.log('App finished');
}

