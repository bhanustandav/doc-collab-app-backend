const mongoose = require('mongoose');
const util = require('util');
const bodyParser = require('body-parser');

// config should be imported before importing any other file
import {config} from './config/config';
// eslint-disable-next-line import/newline-after-import
const app = require('./config/express');
app.use(bodyParser.urlencoded({ extended: true }));


const debug = require('debug')('doc-collab-app-backend:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName: any, method: any, query: any, doc: any) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(443, () => {
    console.info(`server started on port ${443} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
