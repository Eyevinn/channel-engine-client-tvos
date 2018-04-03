var express = require('express');
var router = express.Router();
var handlebars = require('handlebars');

var data = {
	channels: [
		{
			"label": "Mixed",
			"name": "random",
		}, {
			"label": "Skaneby TV",
			"name": "skaneby",
		}, {
			"label": "STSWE17",
			"name": "stswe17",
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
         <listItemLockup onselect="play('{{channel.name}}')">
            <title>{{channel.label}}</title>
         </listItemLockup>
         {{/each}}
      </section>
      <relatedContent>
         <imgDeck>
            <img src="http://localhost:8081/rick1.jpg" />
            <img src="http://localhost:8081/rick2.jpg" />
         </imgDeck>
      </relatedContent>
   </list>
</paradeTemplate>
</document>`;

	var template = handlebars.compile(source);
	return template({'data': data});
}

module.exports = router;
