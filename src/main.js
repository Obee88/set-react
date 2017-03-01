// Polyfills
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import gameReducer from './state/game/reducer';
import cardsReducer from './state/cards/reducer';
import { createStore, combineReducers } from 'redux';

const store = createStore(
  combineReducers({
    cards: cardsReducer,
    game: gameReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import { Provider } from 'react-redux';
const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('app'));
};

store.subscribe(render);
render();
