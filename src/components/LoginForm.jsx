import React from 'react';
import { TextField, Button, Typography, Container, Avatar, Link, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  animation: 'fadeIn 1s ease-out',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    maxWidth: '350px',
  },
}));

const StyledAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  margin: '20px auto',
  backgroundColor: '#ab47bc',
});

const LoginForm = () => {
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', formValues);
  };

  return (
    <StyledContainer>
      <StyledAvatar src="/path/to/user-photo.jpg" alt="User" />
      <Typography variant="h5" color="primary" gutterBottom>
        Nome de Usuário
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Usuário"
          name="username"
          variant="outlined"
          margin="normal"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Senha"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Link href="#" variant="body2" color="primary">
          Recuperar Senha
        </Link>
        <br />
        <Link component={RouterLink} to="/signup" variant="body2" color="primary">
          Cadastrar Novo Usuário
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default LoginForm;
