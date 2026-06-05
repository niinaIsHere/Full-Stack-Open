import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
          username
            <TextField
              label='username'
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
          password
            <TextField
              label='password'
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <Button type="submit" variant='contained' style={{ marginTop: 10 }}>login</Button>
      </form>
    </div>
  )
}

export default LoginForm