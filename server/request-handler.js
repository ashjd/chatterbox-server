
var http = require('http');
var data = {results: []};
var ip = 'http://127.0.0.1:3000';

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  console.log(request.url);
  headers['Content-Type'] = 'application/json';
  var statusCode = 200;

  if (request.method === 'POST' && request.url === '/classes/messages') {
    var messageData = '';
    request.on('data', (chunk) => {
      messageData += chunk;
    });
    request.on('end', () => {
      data.results.push(JSON.parse(messageData));
    });
    statusCode = 201;
  } 

  if (request.method === 'GET') {
    if (request.url === '/classes/messages') {
      statusCode = 200;
    } else if (request.url === '/') {
      statusCode = 200;
    } else {
      statusCode = 404;
    }
  }

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
