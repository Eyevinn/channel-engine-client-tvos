# Eyevinn TV

Eyevinn TV is a tvOS app that allows playing streams from [Eyevinn Channel Engine](https://github.com/Eyevinn/channel-engine).

## Functional Overview
The first time the app is opened, the 'Mixed' channel from the Eyevinn Channel Engine is automatically played back.  
The user can then click the 'Menu' button to display the 'channel selection' screen, and select another channel.

## Technical Overview
The tvOS app is built with the [TVML](https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/ATV_Template_Guide/) and [TVMLJS](https://developer.apple.com/documentation/tvmljs) frameworks.  
The code base is divided into 2 parts:

* tvos-app
* backend

### TvOS-app
The 'tvos-app' directory contains the XCode project for the Eyevinn TV tvOS app.  
Because we're using the TVML framework, the app is very simple and only loads a javascript file from the backend (https://eyevinntv.herokuapp.com/javascripts/eyevinntv-main.js) to bootstrap the app.   
When testing with a local backend, the url needs to be changed to http://localhost:5000/javascripts/eyevinntv-main.js.

The tvOS app can be tested using the Simulator.

### Backend
The 'backend' directory contains a simple NodeJS web application that serves the TVML, javascript and image files.  
It is uses the [Express](https://expressjs.com/) framework, as well as [Handlebars](https://handlebarsjs.com/) template engine.  

To run the backend locally (without Heroku)
```
cd backend
npm install
npm start
```  
You should then be able to retrieve the javascript file that bootstrap the app, at http://localhost:5000/javascripts/eyevinntv-main.js.

In order to work in real life, the backend server should be accessible from the Internet. Currently, the backend is deployed on [Heroku](https://www.heroku.com).

**Some useful commands**

Running the app locally with Heroku (using nodemon)
```
nodemon --exec "heroku local" --signal SIGTER
````

Pushing changes to Heroku (from the root of the repository)
```
git subtree push --prefix web heroku master
```

