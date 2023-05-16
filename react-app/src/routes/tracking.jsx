import React, {useState} from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpeedIcon from '@mui/icons-material/Speed';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Tracking() {
    const [toggle, setToggle] = useState(true)
    
    return(
      <div>
        <Button component={Link} to="addExercise" style={{backgroundColor : "#f2a950"}} endIcon={<FitnessCenterIcon/>} variant="contained">Exercise</Button>
        <Button component={Link} to="addWeight" style={{backgroundColor : "#bf52b8"}} endIcon={<SpeedIcon/>} variant="contained">Weight</Button>  
        <Button component={Link} to="addFood" style={{backgroundColor : "#7db33b"}} endIcon={<RestaurantIcon/>} variant="contained">Food</Button>      
      </div>
    )
  }