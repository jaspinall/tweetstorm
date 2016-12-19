const express = require('express');
const Twitter = require('twitter');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const client = new Twitter({
  consumer_key: "NiRvanOOctsdaVCfxw7mUpy6L",
  consumer_secret: "0nHXTtZOzo2xggNO9tztltbuoaDXIJ3gr4YzE28t7QtIByNekh",
  access_token_key: "512489891-3oUv9icyfWzzHMPqsjsNNjIDlJjaZeDmsMYKOfLp",
  access_token_secret: "h0QiaqumFes1qdGExAoyOjHZs7mnuZIE15zLO2DFPBLuE"
});


const stream = client.stream('statuses/filter', {locations: '-122.75,36.8,-121.75,37.8'});
stream.on('data', function(event) {
  console.log(event);
});

app.listen(3000, () => console.log('listening on port 3000'));
