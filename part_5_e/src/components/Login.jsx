import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = ({ user, setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  if(user)
    return <Navigate to='/' replace />


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login({ username, password })
      setUser(userResponse)
      blogService.setToken(userResponse.token)
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(userResponse),
      )
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setErrorMessage('Wrong username or password')
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        <label>
                  username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
                  password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login