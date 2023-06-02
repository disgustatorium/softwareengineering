import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const AppSettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // destroys cookie 
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
    navigate('/');
  };

  return (
    <Container sx={{ padding: '30px' }} maxWidth="sm">
      <Item>
        <Typography variant="h2" component="h1" gutterBottom>
          App settings
        </Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </Item>
    </Container>
  );
};

export default AppSettings;
