var express = require('express');
var router = express.Router();
var handlebars = require('handlebars');

var data = {
	channels: [
		{
			"label": "Mixed",
			"name": "random",
			"images": ['http://localhost:5000/mixed1.png'],
		}, {
			"label": "Skaneby TV",
			"name": "skaneby",
			"images": ['http://localhost:5000/skaneby3.png'],
		}, {
			"label": "STSWE17",
			"name": "stswe17",
			"images": ['http://localhost:5000/stswe3.jpg', 'http://localhost:5000/stswe4.png'],
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
         <listItemLockup onselect="play('{{channel.name}}')" onhighlight="updateBackgroundImage('{{channel.name}}')">
            <title>{{channel.label}}</title>
         </listItemLockup>
         {{/each}}
      </section>
      <relatedContent>
         <imgDeck id="background-images">
            <img src="http://localhost:5000/stswe1.png" />
            <img src="http://localhost:5000/skaneby1.png" />
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
