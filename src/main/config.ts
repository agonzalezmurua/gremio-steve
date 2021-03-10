import path from 'path';

// Copy this file to config.js and update the settings.
// Example settings
const config = {
  protocol: process.env.NODE_ENV !== 'production' ? 'steve-dev' : 'steve',
  api_uri: 'http://localhost:3000/api',
  icon_path: path.join(__dirname, '..', 'common/assets/logo.ico'),
};

export default config;
