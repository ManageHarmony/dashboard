'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginPageProps {
  userType: 'manager' | 'creator';
}

const LoginPage: React.FC<LoginPageProps> = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showToastError = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiEndpoint =
      userType === 'manager'
        ? 'https://harmony-backend-z69j.onrender.com/api/manager/login'
        : 'https://harmony-backend-z69j.onrender.com/api/login/creator';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem(`${userType}_token`, data.token);
        localStorage.setItem(`${userType}_id`, data.id);
        localStorage.setItem(`${userType}_isAuthenticated`, 'true');
        router.push(userType === 'manager' ? '/manager' : '/creator');
      } else {
        showToastError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error)
      showToastError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#ff6600' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#ff6600' }}>
            {userType === 'manager' ? 'Manager Login' : 'Creator Login'}
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: '#ff6600' }, 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6600', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6600', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff6600', 
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: '#ff6600' }, 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6600', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6600', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff6600', 
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#ff6600',
                '&:hover': {
                  bgcolor: '#e55a00',
                },
              }}
            >
              {loading ? <Spinner animation="border"  size="sm" /> : 'Log In'}
            </Button>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
