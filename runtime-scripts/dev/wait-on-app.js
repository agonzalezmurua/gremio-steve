//
// Waits until the app server is running
//

const waitOn = require("wait-on");
const config = require("config");
const opts = {
  resources: [`http://localhost:${config.get("app.dev.port")}`],
};

waitOn(opts, (err) => {
  if (err) {
    throw err;
  }
});
