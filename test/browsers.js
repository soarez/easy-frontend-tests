var ext = require('util')._extend;
var webdriverio = require('webdriverio');

var browsers = [
  { desiredCapabilities: { browserName: 'firefox' } },
//  { desiredCapabilities: { browserName: 'chrome' } },
//  { desiredCapabilities: { browserName: 'safari' } },

//  {
//    desiredCapabilities: {
//      browserName: 'internet explorer',
//      platform: 'Windows 8.1',
//      version: '11'
//    },
//    user: process.env.SAUCE_USERNAME,
//    key: process.env.SAUCE_ACCESS_KEY,
//    port: 80,
//    host: 'ondemand.saucelabs.com'
//  }
];

module.exports = start;

function start(cb) {
  browsers.forEach(use);

  function use(conf) {
    var client = webdriverio.remote(conf);
    client.info = conf.desiredCapabilities;
    cb(client);
  }
}

