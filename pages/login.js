import React from 'react';

import App from '../components/App';
import Login from '../components/Login';
import withData from '../lib/withData';

export default withData(() => (
  <App>
    <Login />
  </App>
));
