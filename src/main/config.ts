import path from 'path';

const config = {
  protocol: process.env.NODE_ENV !== 'production' ? 'steve-dev' : 'steve',
  api_uri: 'http://localhost:3000/api', // TODO: calculate form ENV
  icon_path: path.join(__dirname, '..', 'common/assets/logo.ico'),
};

export default config;
