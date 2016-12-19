const express = require('express');
const Twit = require('twit');
const bodyParser = require('body-parser');
const WebSocketServer = require('ws').Server;
const http = require('http');

const CLIENT = new Twit({
  consumer_key: "NiRvanOOctsdaVCfxw7mUpy6L",
  consumer_secret: "0nHXTtZOzo2xggNO9tztltbuoaDXIJ3gr4YzE28t7QtIByNekh",
  access_token: "512489891-3oUv9icyfWzzHMPqsjsNNjIDlJjaZeDmsMYKOfLp",
  access_token_secret: "h0QiaqumFes1qdGExAoyOjHZs7mnuZIE15zLO2DFPBLuE"
});

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
let i = 1;

const wss = new WebSocketServer({ server });
wss.on('connection', ws => {
  const subscriptions = {};
  const id = i++;
  console.log(`${id} OPEN`);
  ws.on('message', message => {
    const data = JSON.parse(message);
    if (data.sub && !subscriptions[data.sub]) {
      console.log('adding ', data.sub, 'subscription');
      subscriptions[data.sub] = CLIENT.stream('statuses/filter', { track: data.sub });
      subscriptions[data.sub].on('tweet', function (tweet) {
          tweet.keyword = data.sub;
          ws.send(JSON.stringify(tweet));
      });
    }
    if (data.unsub && subscriptions[data.unsub]) {
      console.log('shutting down ', data.unsub, 'stream');
      subscriptions[data.unsub].stop();
    }
  })
})

server.listen(3000, () => console.log('listening on port 3000'));
