# Easy front-end tests

Write & run front-end tests easily either locally or through a selenium provider.

## Writing tests

When specifying the URLs for things that are running locally prefer `vcap.me`
over `localhost`. This is necessary for some target systems where it isn't easy
to forward traffic to the tunnel.

### Functional tests

Look at `test/flow1.js` for an example.  
Edit or create similar files under `test/`.  
Take a look at the [WEBDRIVER I/O API](http://webdriver.io/api.html) to know
what you can do with the `browser` (or `client`) object.

### Unit tests

Look at `test/unit/lib` for an example.  
Edit or create similar files under `test/unit`.  
Add dependencies in `test/unit/index.html`.

## Selecting target browsers

Edit `test/browsers.js`.  
There is should be a list (array) of what browsers to test.

### To add a local browser as target

```javascript
var browsers = [
...
{ desiredCapabilities: { browserName: 'firefox' } },
...
];
```

### To add a remote browser from a selenium provider

e.g. sauce labs:

```
var browsers = [
...
  {
    desiredCapabilities: {
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    port: 80,
    host: 'ondemand.saucelabs.com'
  }
...
];
```

## Running the tests

For local tests make sure [selenium server](http://www.seleniumhq.org/) (e.g. `brew install selenium-server-standalone`) is running.

For remote tests, make sure you have a tunnel setup. e.g. for sauce labs, [Sauce Connect](https://docs.saucelabs.com/reference/sauce-connect/).

### Functional tests

```
$ mocha
```

### Unit tests

```
node test/unit/run
```

