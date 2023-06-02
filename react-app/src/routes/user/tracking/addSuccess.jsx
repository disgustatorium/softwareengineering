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
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom"
import { userToken } from '../root'; 

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export default function Tracking() {

  const navigate = useNavigate();

  if (!userToken) {
    navigate('/login'); 
  } else {
    console.log(userToken);
  }


    const [toggle, setToggle] = useState(true)
    
    return(
      <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
        <Item>
          <Container sx={
            {
              padding: "15px"
            }
          } maxWidth="sm">
          </Container>
          <Typography variant='h3'>
            Added successfully!
          </Typography>
          <Container sx={
            {
              padding: "15px"
            }
          } maxWidth="sm">
          </Container>
          <Button variant="contained" onClick={()=>{window.history.back()}} endIcon={<AddCircleIcon />}> Add another </Button>
          <Container sx={
            {
              padding: "15px"
            }
          } maxWidth="sm">
          </Container>
       </Item>
      </Container>
    )
  }
