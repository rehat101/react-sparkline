import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import SparkStore from './SparkStore';
// import { setLogEnabled } from 'mobx-react-devtools';
// import { useStrict } from 'mobx';
// useStrict(true);
// setLogEnabled(true);

window._SparkStore = SparkStore;

const html_root = document.getElementById('root');
render(<App stores={{SparkStore}}/>, html_root);

//HMR
if (module.hot) {
  module.hot.accept();
}


