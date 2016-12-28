const express = require('express');
const path = require('path');
const app = express();
const request = require('superagent');

app.get('/test', function(req, res) {
  return request.get('http://localhost:3000/').then((data) => {
    res.send(data.text);
  })
  .catch(e => res.send(e));
});

app.get('/code', function(req, res) {
  const code = encodeURIComponent(req.query.code);
  return request.get('http://localhost:3000/analyze?code=' + code).then((data) => {
    res.send(data.text);
  })
  .catch(e => res.send(e));
});


module.exports = app;
