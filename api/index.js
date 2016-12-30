const express = require('express');
const path = require('path');
const app = express();
const request = require('superagent');
var cmd = require('node-cmd');

app.get('/analyze', function(req, res) {
  const code = req.query.code;
  cmd.get(`node --expose-debug-as=Debug api/jslogger.js --jsondump=true --code="${code}"`,
  function(ret) {
    res.send(ret);
  });
});

module.exports = app;
