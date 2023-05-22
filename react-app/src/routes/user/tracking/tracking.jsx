import React, {useState} from 'react'
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpeedIcon from '@mui/icons-material/Speed';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export default function Tracking() {
    const [toggle, setToggle] = useState(true)
    
    return(
      <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
        <Item>
          <Grid container direction="column" rowGap={2} maxWidth="sm">
            <Button component={Link} to="addExercise" style={{backgroundColor : "#f2a950"}} endIcon={<FitnessCenterIcon/>} variant="contained">Exercise</Button>
            <Button component={Link} to="addWeight" style={{backgroundColor : "#bf52b8"}} endIcon={<SpeedIcon/>} variant="contained">Weight</Button>  
            <Button component={Link} to="addFood" style={{backgroundColor : "#7db33b"}} endIcon={<RestaurantIcon/>} variant="contained">Food</Button>      
          </Grid>
        </Item>
      </Container>
    )
  }