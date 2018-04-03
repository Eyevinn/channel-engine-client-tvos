var fifou = 0;

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

function updateBackgroundImage(channelName) {
    var imgDeckElement = getActiveDocument().getElementById('background-images');
    imgDeckElement.innerHTML = '';
    var imageUrls = getImagesForChannel(channelName);
    console.log("image urls....", imageUrls);
    imageUrls.forEach(function(imageUrl) {
        console.log('image url is ', imageUrl);
        addImageToImageDeck(imgDeckElement, imageUrl);
    });
}

function getImagesForChannel(channelName) {
    var hiddenNodes = getActiveDocument().getElementById('background-images').parentNode.getElementsByTagName('hidden');
    for (var i=0;i<hiddenNodes.length;i++) {
        var hiddenElement = hiddenNodes.item(i);
        console.log('ahaha', channelName, hiddenElement, hiddenElement.getAttribute('channel'), hiddenElement.channel);
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
    var templateURL = 'http://localhost:5000/eyevinntv-main.html';
    getDocument(templateURL);
}
 
App.onExit = function() {
    console.log('App finished');
}

