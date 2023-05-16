import * as React from 'react';
import { Button, Typography, ThemeProvider, AppBar, Toolbar} from '@mui/material';
import theme from './theme';
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="background" >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}> FitTrack </Typography>
        <Button size="small" variant="contained" color="secondary" component={Link} to="/login"> Log In </Button>
      </Toolbar>
    </AppBar>   
    </ThemeProvider>
  );
}

export default Navbar;

