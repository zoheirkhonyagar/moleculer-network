'use strict';

const ApiGateway = require('moleculer-web');
const { MoleculerError } = require('moleculer').Errors;
const _ = require('lodash');
module.exports = {
  name: 'api',
  mixins: [ApiGateway],
  // Exposed IP
  // ip: "0.0.0.0",

  // HTTPS server with certificate
  // https: {
  // 	key: fs.readFileSync(path.join(__dirname, "../ssl/key.pem")),
  // 	cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.pem"))
  // },

  //http2: true,

  dependencies: [
    // { name: "auth", version: 1 }, // with numeric version
  ],
  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: process.env.PORT || 3000,

    // Global CORS settings for all routes
    cors: {
      // Configures the Access-Control-Allow-Origin CORS header.
      origin: '*',
      // Configures the Access-Control-Allow-Methods CORS header.
      methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
      // Configures the Access-Control-Allow-Headers CORS header.
      allowedHeaders: ['content-type', 'authorization'],
      // Configures the Access-Control-Expose-Headers CORS header.
      exposedHeaders: [],
      // Configures the Access-Control-Allow-Credentials CORS header.
      credentials: false,
      // Configures the Access-Control-Max-Age CORS header.
      maxAge: 3600
    },
    rateLimit: {
      // How long to keep record of requests in memory (in milliseconds).
      // Defaults to 60000 (1 min)
      window: 60 * 1000,

      // Max number of requests during window. Defaults to 30
      limit: process.env.NODE_ENV !== 'test' ? 30 : 80,

      // Set rate limit headers to response. Defaults to false
      headers: true,

      // Function used to generate keys. Defaults to:
      key: req => {
        return (
          req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress
        );
      }
      //StoreFactory: CustomStore
    },
    logRequestParams: 'info',
    path: '/api/',
    // Logging response data with 'debug' level
    logResponseData: 'debug',
    bodyParsers: {
      json: true,
      urlencoded: { extended: true }
    },
    callOptions: {
      timeout: 3000,
      fallbackResponse: 'request timed out'
    },
    use: [
      // cookieParser(),
      // helmet()
    ],
    // Serve assets from "public" folder
    assets: {
      folder: 'public'
    },
    routes: [
      {
        path: '',
        authorization: false,
        mappingPolicy: 'restrict',
        bodyParsers: {
          json: true
        },
        aliases: {
          'GET say': 'say.sayhi'
        }
      }
    ]
  }
};
