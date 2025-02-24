const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:62088` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7071';

const PROXY_CONFIG = [
  {
    context: [
      "/person",
      "/astronautDuty"
    ],
    target: 'https://localhost:7071',
    secure: false,
    changeOrigin: true,
    onProxyReq: function(request) {
      request.setHeader("origin", "http://localhost:7071");
    },
  }
]

module.exports = PROXY_CONFIG;
