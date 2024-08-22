'use client';

import { useState} from 'react';

import { TextField, Button, Typography, Container, Box, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const showToastError = (message: string) => {
    toast.error(message, {
        position: "bottom-center",
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

    try {
      setLoading(true);
        const response = await fetch('https://harmony-backend-z69j.onrender.com/api/login/creator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log("login data", data)

        if (data.token) {
            // Store token in localStorage
            setLoading(false);
            localStorage.setItem('token', data.token);
            localStorage.setItem('creator id', data.id);
            localStorage.setItem('isAuthenticated', 'true');

            // Redirect to /creator page
            router.push('/creator');
        } else {
            console.error('Login failed');
            setLoading(false);
            showToastError(`Login Failed`)

        }
    } catch (error) {
        console.error('Error during login:', error);
        setLoading(false);
        showToastError(`Login Failed`)
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
            Login
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
                style: { color: '#ff6600' }, // Customize label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6600', // Customize border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6600', // Customize hover border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff6600', // Customize focused border color
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
                style: { color: '#ff6600' }, // Customize label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6600', // Customize border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6600', // Customize hover border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff6600', // Customize focused border color
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
              { loading ? <Spinner /> :'Log In'}
            </Button>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
    
  );
};

export default LoginPage;
