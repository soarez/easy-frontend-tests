var path = require('path');
var assert = require('assert');

var static = require('./static');
var browsers = require('./browsers');

function screenshotPath() {
  var args = Array.prototype.slice.call(arguments);
  args = args.filter(function(a){ return !!a;});
  return path.join(__dirname, 'screens', args.concat('png').join('.'));
}

browsers(function(browser) {
  var server;
  var port = Math.floor(Math.random() * 3 * 1000 + 7000);
  var root = path.join(__dirname, '..');
  var baseUrl = 'http://vcap.me:' + port + '/public';

  var browserName = browser.info.browserName;
  var browserVersion = browser.info.version;
  var ss = screenshotPath.bind(null, browserName, browserVersion);
  var desc = browserName + ' ' + (browserVersion || '');

  describe(desc + ' flow1', function() {

    before(function(cb) { server = static({ port: port, path: path }, cb); });
    before(function(cb) { browser.init(cb); });

    it('loads', function(cb) {
      browser
        .url(baseUrl)
        .waitForVisible('#title', 60 * 1000)
        .saveScreenshot(ss('mainscreen'))
        .call(cb);
    });

    after(function(cb) { browser.end(cb); });
    after(function(cb) { server.stop(cb); });
  });
});
