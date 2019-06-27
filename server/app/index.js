import express from 'express';
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import cookieSession from 'cookie-session';

import csrf from 'csurf';
import helmet from 'helmet';
import { oauthLogin } from '../middlewares/auth';
import graphql from '../middlewares/graphql';
import {
  h5Route,
  staticFile,
} from '../middlewares/staticRender';
import {
  onError,
  notFound,
} from '../middlewares/errorHandler';
import {
  sessionSecret,
  isDev,
} from '../config'

const app = express();

app.set('x-powered-by', false);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [sessionSecret],
  domain: isDev ? 'localhost' : 'react.colorpk.com',
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  httpOnly: true,
}));

if (isDev) {
  app.get('/static/:fileName', staticFile);
} else {
  app.use(csrf());
}

app.use('/graphql', graphql);
app.get('/auth/:oauth', oauthLogin);
app.get('/*', h5Route);
app.use(onError);
app.use(notFound);

export default app;