// Copy this as config.js
const config = {
  protocol: 'steve-dev',
  schemeName: 'com.example.electron1',
  schemeSlashCount: 1, // 1 or 2 (not a string!)
  idpUrl: 'https://account-d.docusign.com',
  implicitClientId: 'b2b5xxxx-xxxx-xxxx-xxxx-xxxxxxxxxx6b',
  implicitReturnPath: 'implicit-result',
  implicitScopes: 'signature',
  implicitRedirectUrl: 'http://xxx.s3-website.us-east-2.amazonaws.com/',
};

export default config;
