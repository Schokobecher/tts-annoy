const express = require('express')
const app = express()
const port = 2888

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



const uuid = require('uuid/v4');

var util = require('util');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cors = require('cors')

const player = require('play-sound')();
var googleTTS = require('google-tts-api');

var https = require('https');
var fs = require('fs');
const path = require('path')

app.listen(port)
logger.info('Server running on ' + port);

// middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(validator());
app.use(cors());



app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method == "GET") {
        var fileuuid = uuid();
        var file = fs.createWriteStream("./media/" + fileuuid + ".mp3");
		req.sanitize('message').escape();
        var msg = req.query.message;
        res.end('Very Nice!')
        logger.info(msg + " via GET received.");

        googleTTS(msg, 'en', 1) // speed normal = 1 (default), slow = 0.24
            .then(function(url) {
                logger.info(url);
                var request = https.get(url, function(response) {
                    response.pipe(file);
                    player.play("./media/" + fileuuid + ".mp3", (err) => {
                        if (err) logger.fatal(`Could not play sound: ${err}`);
                        logger.info("played file " + fileuuid);
                    });
                })
            });
    } else if (req.method == "POST") {
        res.end("received POST request.");
        logger.info("received POST request.");

    } else {
        res.end("Undefined request.");
        logger.error("Undefined request.");
    }

});
