require('colors');
var path = require('path');

var static = require('../static');
var browsers = require('../browsers');

browsers(function(browser) {
  var browserName = browser.info.browserName;
  var browserVersion = browser.info.version;

  var port = Math.floor(Math.random() * 3 * 1000 + 7000);
  var root = path.join(__dirname, '..', '..');
  var server = static({ port: port, path: root }, function() {
    browser.init(test);
  });

  function test() {
    browser
      .url('http://vcap.me:' + port + '/test/unit/index.html')
      .timeoutsAsyncScript(10000)
      .executeAsync(function(cb) {
        if (done)
          return deliver();

        runner.on('end', deliver);
        function deliver() { cb(tests); }
      }, function(err, ret) {
        if (err) throw err;

        var tests = ret.value;
        tests.forEach(log);
        function log(test) {
          var status = !test.error ? 'OK'.green : 'FAILED'.red;
          console.log(
            browserName,
            browserVersion || '',
            '—',
            test.fullTitle,
            status,
            test.error ? test.error.string + '\n' + test.error.stack : '');
        }
      }).call(done);
  }

  function done() {
    browser.end();
    server.stop();
  }
});

