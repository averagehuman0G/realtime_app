'use strict'
var PubNub = require('pubnub');
const express = require('express');
const logger  = require('morgan');
const path    = require('path');
const app     = express();
const PORT    = process.argv[2] || process.env.port || 3000;


app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => console.log('server here! listening on', PORT));

function publish() {

    pubnub = new PubNub({
        publishKey : 'pub-c-56428378-3eb7-4c27-892c-619f4235ed32',
        subscribeKey : 'sub-c-56d122dc-550e-11e7-af22-02ee2ddab7fe'
    })

    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            message : { txt: "Testing for everyone within 5 miles."}, 
	    channel : "5miles"
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
		console.log(statusEvent);
                publishSampleMessage();
            }
        },
        message: function(message) {
            console.log("message-->", message);
        },
        presence: function(presenceEvent) {
            // handle presence
		console.log('presence');
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['5miles'] 
    });
};


publish();
