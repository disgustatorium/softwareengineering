import * as React from 'react';
import { Button, Typography, ThemeProvider, AppBar, Toolbar} from '@mui/material';
import theme from './theme';

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="background" >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}> FitTrack </Typography>
        <Button size="small" color="inherit"> Home </Button>
        <Button size="small" color="inherit"> About Us </Button>
        <Button size="small" variant="contained" color="secondary"> Log In </Button>
      </Toolbar>
    </AppBar>   
    </ThemeProvider>
  );
}

export default Navbar;

