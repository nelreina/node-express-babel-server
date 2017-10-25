import http from 'http';
import express from 'express';
import session from 'express-session';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import models from './models';
import routes from './routes';
import config from './config.json';

const app = express();
const port = config.port || 3000;

app.use(compression());
app.use(
  session({
    secret: 'node',
    resave: false,
    saveUninitialized: false
  })
);
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

console.log('Starting Server...');

routes(app);

// models.sequelize.sync({ }).then( () => {

// Ping Server
const response = { message: 'Server is alive and well!', status: 'OK' };
app.get('/ping', (req, res) => {
  res.send({ ...response, status: 'Algo mas' });
});

// Not Found Routes
app.all('/*', (req, res) => {
  res.status(401).send({ message: 'Not authorized' });
});

const server = http.createServer(app);

server.listen(port, () => console.log(`App is served on port ${port}`));

// });
