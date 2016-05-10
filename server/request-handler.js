
var http = require('http');
var data = {results: []};

var requestHandler = function(request, response) {
 
  if (request.method === 'POST' && request.url === '/classes/messages') {
    var messageData = '';
    request.on('data', (chunk) => {
      messageData += chunk;
    });
    request.on('end', () => {
      data.results.push(JSON.parse(messageData));
      response.writeHead(201, headers);
      response.end(JSON.stringify(data));
    });
  }

  if (request.method === 'GET') {
    //console.log ('request method was - ', request.method);
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  }
//  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
