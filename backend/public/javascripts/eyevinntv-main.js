var baseUrl;

function loadChannelSelectionPage() {
    var url = baseUrl + '/eyevinntv-main.html';
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {replaceLoadingPageWithChannelSelectionPage(templateXHR.responseText);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}
 
function replaceLoadingPageWithChannelSelectionPage(channelSelectionPageTemplate) {
    channelSelectionPageTemplate = channelSelectionPageTemplate.replace(/BASE_URL/g, baseUrl);
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(channelSelectionPageTemplate, "application/xml");
    navigationDocument.replaceDocument(parsedTemplate, getFirstDocumentInStack());
}

function playChannel(playlistName) {
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

function getFirstDocumentInStack() {
    return navigationDocument.documents[0];
}

function updateBackgroundImage(channelName) {
    var imgDeckElement = getFirstDocumentInStack().getElementById('background-images');
    imgDeckElement.innerHTML = '';
    var imageUrls = getBackgroundImagesForChannel(channelName);
    imageUrls.forEach(function(imageUrl) {
        addImageToImageDeck(imgDeckElement, imageUrl);
    });
}

function getBackgroundImagesForChannel(channelName) {
    var hiddenNodes = getFirstDocumentInStack().getElementById('background-images').parentNode.getElementsByTagName('hidden');
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
    var imgElement = getFirstDocumentInStack().createElement("img");
    imageDeckElement.appendChild(imgElement);
    imgElement.setAttribute('src', imageUrl);
}

function displayLoadingScreen() {
    var template = '<document><loadingTemplate><activityIndicator><text>Eyevinn TV</text></activityIndicator></loadingTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
    
}
 
App.onLaunch = function(options) {
    baseUrl = options.BASEURL;
    displayLoadingScreen();
    playChannel('random');
    loadChannelSelectionPage();
}
 
App.onExit = function() {
    console.log('App finished');
}

