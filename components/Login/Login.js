import { PropTypes } from 'prop-types';

const Login  = ({ handleLogin, loading }) => {
  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <p>{ loading ? 'Loading' : null }</p>
      <input placeholder='username' name='username' />
      <input placeholder='password' name='password' type='password' />
      <button type='submit'>Login</button>
      <style jsx>{`
      `}</style>
    </form>
  )
}

Login.defaultProps = {
  loading: false
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Login
