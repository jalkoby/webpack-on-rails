/* globals document, module */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

let appNode = document.getElementById('app');
function render(Component) {
  return ReactDOM.render(
    <AppContainer><Component /></AppContainer>,
    appNode
  );
}

render(App);

if(module.hot) {
  module.hot.accept('./App', () => render(App));
}
