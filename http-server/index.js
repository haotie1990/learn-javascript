'use strict';

const http = require('http');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.end('hello world');
// });

const server = http.createServer();

server.on('request', (req, res) => {
  res.statusCode = 200;
  res.end('hello world');
});

server.listen(3000, 'localhost', (err, res) => {
  if (err) {
    process.exit(-1);
    return;
  }
  console.log('server running');
});