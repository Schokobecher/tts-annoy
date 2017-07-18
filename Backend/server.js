// express
var util = require('util');
var cors = require('cors');
const express = require('express')
const app = express()
const port = 2888
var validator = require('express-validator');
app.listen(port)

// middleware
app.use(validator());
app.use(cors());

// log4js
var log4js = require('log4js');
log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        },
        file: {
            type: 'dateFile',
            filename: 'server.log',
            pattern: '-yyyy-MM-dd'
        }
    },
    categories: {
        default: {
            appenders: ['out', 'file'],
            level: 'debug'
        }
    }
});
const logger = log4js.getLogger('server');


// play-sound
const player = require('play-sound')();

// tts
var googleTTS = require('google-tts-api');

// misc
var https = require('https');
var fs = require('fs');
const path = require('path')
const uuid = require('uuid/v4');
// Server started
logger.info('Server running on ' + port);

app.get('/:message', function(req, res) {
  res.send('HeLlO!');
});

app.use(function(req, res, next) {
	// Set header options
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

	
	// Request was made using ?message=
		if (req.query.message) {
			
		var IPfromRequest = req.ip;
		remoteIP = IPfromRequest.replace(/^.*:/, '');
		
		var msg = req.sanitize('message').escape();
		// TODO: second 'undefined' GET request when calling the backend direcly? We work around it for now...
		if(undefined == msg) {
				var msg = '';
		};
		if (!msg.length) {
			return;
		};

        var fileuuid = uuid();
        var file = fs.createWriteStream("./media/" + fileuuid + ".mp3");
        logger.info(msg + " from " + remoteIP +" received.");
		// Google magic
        googleTTS(msg, 'en', 1) // speed normal = 1 (default), slow = 0.24
            .then(function(url) {
               logger.info("Generated: "+ url);
			   
			   // Save the response as .mp3
                var request = https.get(url, function(response) {
                    response.pipe(file);
					
					// Play the .mp3
                    player.play("./media/" + fileuuid + ".mp3", (err) => {
                        if (err) logger.fatal(`Could not play sound: ${err}`);
                        logger.info("played file " + fileuuid + ".mp3");
                    });
                })
            });
		res.end('Very Nice!')
    }  else {
        return;
    }
});