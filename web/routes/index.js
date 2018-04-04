var express = require('express');
var router = express.Router();
var handlebars = require('handlebars');

var baseUrl = "https://eyevinntv.herokuapp.com";

var data = {
	channels: [
		{
			"label": "Mixed",
			"name": "random",
			"images": [`${baseUrl}/mixed1.png`],
		}, {
			"label": "Skaneby TV",
			"name": "skaneby",
			"images": [`${baseUrl}/skaneby3.png`],
		}, {
			"label": "STSWE17",
			"name": "stswe17",
			"images": [`${baseUrl}/stswe3.jpg`, `${baseUrl}/stswe4.png`],
		}, 
	]
};

router.get('/eyevinntv-main.html', function(req, res, next) {
	res.send(renderTemplate());
});

function renderTemplate() {
 	var source = `<document>
<paradeTemplate>
   <list>
      <header>
         <title>Available Channels wxxxxx</title>
      </header>
      <section>
         {{#each data.channels as |channel|}}
         <listItemLockup onselect="play('{{channel.name}}')" onhighlight="updateBackgroundImage('{{channel.name}}')">
            <title>{{channel.label}}</title>
         </listItemLockup>
         {{/each}}
      </section>
      <relatedContent>
         <imgDeck id="background-images">
         </imgDeck>
         {{#each data.channels as |channel|}}
         <hidden channel="{{channel.name}}">
         	{{#each channel.images as |imageUrl|}}
            <img src="{{imageUrl}}" />
            {{/each}}
         </hidden>
         {{/each}}
      </relatedContent>
   </list>
</paradeTemplate>
</document>`;

	var template = handlebars.compile(source);
	return template({'data': data});
}

module.exports = router;
