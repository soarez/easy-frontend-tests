var http = require('http');
var static = require('node-static');

module.exports = StaticServer;

function StaticServer(opts, cb) {
  var file = new static.Server(opts.path);
  var server = http.createServer(function (req, res) {
    req.addListener('end', function () {
      file.serve(req, res);
    }).resume();
  }).listen(opts.port, cb);

  return { stop: server.close.bind(server) };
}
