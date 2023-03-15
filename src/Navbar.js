import * as React from 'react';
import { Button, Typography, ThemeProvider, AppBar, Toolbar} from '@mui/material';
import theme from './theme';

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="background" >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> FitTrack </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About Us</Button>
        <Button variant="contained" color="secondary">Log In</Button>
      </Toolbar>
    </AppBar>   
    </ThemeProvider>
  );
}

export default Navbar;

