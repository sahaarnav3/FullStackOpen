import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate, Navigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
      <h1>Log in to application</h1>
      <div>
        <TextField label="username" value={username} onChange={(e) => setUsername(e.target.value)} variant="standard"
          sx={{
            '& .MuiInput-root': {
              fontSize: '1.4rem', // Increases input and placeholder size
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem', // Increases floating label size
            }
          }}
        />
      </div>
      <div>
        <TextField label="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} variant="standard"
          sx={{
            '& .MuiInput-root': {
              fontSize: '1.4rem', // Increases input and placeholder size
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem', // Increases floating label size
            },
            marginTop: '15px'
          }}
        />
      </div>
      <Button variant="contained" type='submit' sx={{ marginTop: '15px' }}>LOGIN</Button>
    </form>
  )
}

export default Login