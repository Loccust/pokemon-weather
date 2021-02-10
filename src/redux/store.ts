import { applyMiddleware, createStore, compose } from 'redux';
import { Reducers } from './reducers';
import logger from 'redux-logger';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

export const Store = compose(applyMiddleware(...middlewares))(createStore)(Reducers);
