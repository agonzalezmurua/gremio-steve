const path = require('path');

if (process.env.NODE_ENV || 'development') {
  require('electron-reloader')(module);
}
require('ts-node').register({
  project: path.resolve(__dirname, 'tsconfig.json'),
}); // This will register the TypeScript compiler
require('./index.ts'); // This will load our Typescript application
