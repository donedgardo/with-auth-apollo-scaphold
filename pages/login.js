import App from '../components/App'
import Header from '../components/Header'
import Login from '../components/Login'
import withData from '../lib/withData'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Login />
  </App>
))
