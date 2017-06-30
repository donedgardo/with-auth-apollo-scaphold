import React from 'react';

import App from '../components/App';
import Login from '../components/Login';
import Header from '../components/Header';
import withData from '../lib/withData';

export default withData(props => (
  <App>
    <Header pathname={props.url.pathname} />
    <Login />
  </App>
));
