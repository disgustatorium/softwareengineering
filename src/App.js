import logo from './logo.svg';
import './App.css';
import theme from './theme';
import Navbar from './Navbar';
import Wave from './Wave';

import React, { useState } from 'react';
import { Typography, Button, ThemeProvider, Box} from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Navbar />
    <Wave />
      <Box sx={{marginLeft: '2em', marginTop: '20px', display: 'flex', alignItems: 'center', height: '100vh'}}>
      <Typography variant="h1" color="primary.contrastText"> Your journey to health starts <Typography component="span" variant="h1" color="primary" > here. </Typography> </Typography>
      <Typography color="primary.contrastText"> Change the way you view health.
      </Typography>
      <Box sx={{marginLeft: '2em', marginTop: "20px"}}>
        <Button sx={{  width: '250px', height: '60px', borderRadius: '30px'}} variant="contained" color="primary">Sign up</Button>
      </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
