import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Sparkline from './Sparkline';

class App extends Component {
  render() {
    return (
      <Provider {...this.props.stores}>
        <div>
          <h3>Stock Info</h3>
          <Sparkline name="AAPL"/>
        </div>
      </Provider>
    );
  }

};

export default App;
