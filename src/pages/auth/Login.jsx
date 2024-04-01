import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// api
import { Login, Register } from '../../axios/todoApi';

// third party
import { Container, Grid, Stack, Card, CardContent, Button, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginSession, setLoginSession] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginSession) {
        delete formData.email;
        await Login({ data: formData });
        navigate('checklist', { replace: true });
      } else {
        await Register({ data: formData });
        setLoginSession(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <Container>
      <Grid container>
        <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh', width: '100vw' }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Stack gap={2}>
                <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
                  {loginSession ? 'Login' : 'Register'}
                </Typography>
              </Stack>
              <form onSubmit={handleSubmit}>
                {!loginSession && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                  />
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {loginSession ? (
                  <>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Login
                    </Button>
                    <Typography textAlign="center">Or</Typography>
                    <Button fullWidth variant="outlined" color="error" onClick={() => setLoginSession(false)}>
                      Register
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Register
                    </Button>
                    <Typography textAlign="center">Or</Typography>
                    <Button fullWidth variant="outlined" color="error" onClick={() => setLoginSession(true)}>
                      Login
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Container>
  );
}
