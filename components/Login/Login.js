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

export default Login
