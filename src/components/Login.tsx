// src/components/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Stack,
  Snackbar,
  Alert,
  Typography,
  Box
} from '@mui/material';
import Carlist from './Carlist';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + '/login', user, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        const jwtToken = res.headers.authorization;         // приходит "Bearer xxxx"
        if (jwtToken !== null) {
          sessionStorage.setItem('jwt', jwtToken);           // сохраняем целиком
          setAuth(true);
        }
      })
      .catch(() => setOpen(true));
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.removeItem('jwt');          // полностью очищаем
  };

  if (isAuthenticated) {
    return <Carlist logOut={handleLogout} />;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Car Shop – Вход</Typography>
        <TextField
          label="Username"
          name="username"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleLogin}>
          Войти
        </Button>
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">
          Ошибка входа – проверь логин и пароль
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;