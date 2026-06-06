import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNotificationActions } from '../stores/NotificationStore';
import { useUserStoreData, useUserStoreActions } from '../stores/userStore';

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setNotificationMessage } = useNotificationActions();
  const { loginUser } = useUserStoreActions();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!loginUser({ username, password })) throw new Error();
      setUsername('');
      setPassword('');
      navigate('/');
      setNotificationMessage('Successfully Logged In', 'success');
    } catch {
      setNotificationMessage('Wrong username or password', 'error');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="standard"
          sx={{
            '& .MuiInput-root': {
              fontSize: '1.4rem', // Increases input and placeholder size
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem', // Increases floating label size
            },
          }}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
          sx={{
            '& .MuiInput-root': {
              fontSize: '1.4rem', // Increases input and placeholder size
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.1rem', // Increases floating label size
            },
            marginTop: '15px',
          }}
        />
      </div>
      <Button variant="contained" type="submit" sx={{ marginTop: '15px' }}>
        LOGIN
      </Button>
    </form>
  );
};

export default Login;
