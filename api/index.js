const express = require('express');
const path = require('path');
const app = express();
const request = require('superagent');
var cmd = require('node-cmd');

var code_start = require(__dirname + '/code');

app.get('/test', function (req, res) {
  cmd.get(`node --expose-debug-as=Debug api/jslogger.js --jsondump=true --code="${code_start}"`,
  function(ret) {
    res.send(ret);
  });
})

app.get('/code', function(req, res) {
  const code = req.query.code;
  cmd.get(`node --expose-debug-as=Debug api/jslogger.js --jsondump=true --code="${code}"`,
  function(ret) {
    res.send(ret);
  });
});


module.exports = app;
