//
// Waits until the app server is running
//

const waitOn = require('wait-on');
const config = require('config');
const opts = {
  resources: [`http://localhost:${config.get('webpack.dev_server.port')}`],
};

waitOn(opts, (err) => {
  if (err) {
    throw err;
  }
});
