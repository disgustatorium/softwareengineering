import '../Landing.css';
import theme from '../theme';
import Navbar from '../components/Navbar';
import Wave from '../components/Wave';
import { Link } from "react-router-dom";


import { Typography, Button, ThemeProvider, Box } from '@mui/material';

function Landing() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Wave />
      <div className="landingContainer">
        <Box sx={{ marginLeft: '2em', marginTop: '20px' }}>
          <Typography variant="h1" color="primary.contrastText"> Your journey to health starts <Typography component="span" variant="h1" color="primary" > here. </Typography> </Typography>
          <Typography color="primary.contrastText"> Change the way you view health.
          </Typography>
          <Box sx={{ marginLeft: '2em', marginTop: "20px" }}>
            <Button sx={{ width: '250px', height: '60px', borderRadius: '30px' }} size="large" variant="contained" color="primary" component={Link} to="/signup">Sign up</Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Landing;
