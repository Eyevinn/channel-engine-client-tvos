var express = require('express');
var router = express.Router();
var handlebars = require('handlebars');

var data = {
	channels: [
		{
			"label": "Mixed",
			"name": "random",
			"images": [`BASE_URL/images/mixed1.png`],
		}, {
			"label": "Skaneby TV",
			"name": "skaneby",
			"images": [`BASE_URL/images/skaneby3.png`],
		}, {
			"label": "STSWE17",
			"name": "stswe17",
			"images": [`BASE_URL/images/stswe3.jpg`, `BASE_URL/images/stswe4.png`],
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
         <title>Available Channels</title>
      </header>
      <section>
         {{#each data.channels as |channel|}}
         <listItemLockup onselect="playChannel('{{channel.name}}')" onhighlight="updateBackgroundImage('{{channel.name}}')">
            <title>{{channel.label}}</title>
         </listItemLockup>
         {{/each}}
      </section>
      <relatedContent>
         <imgDeck id="background-images">
         	{{#each data.channels.0.images as |imageUrl|}}
         	<img src="{{imageUrl}}" />
         	{{/each}}
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
