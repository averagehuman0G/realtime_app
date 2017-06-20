'use strict'
var PubNub = require('pubnub');
const express = require('express');
const logger  = require('morgan');
const path    = require('path');
const app     = express();
const PORT    = process.argv[2] || process.env.port || 3000;


app.use(logger('dev'));

app.use(express.static(__dirname + '/client'));
app.listen(PORT, () => console.log('server here! listening on', PORT));


