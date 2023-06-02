import React, {useState} from 'react'
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
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
          <Grid container direction="column" rowGap={2} maxWidth="sm">
          <Button variant="contained" onClick={()=>{window.history.back()}} endIcon={<AddCircleIcon />}> Add another </Button>
          <Button variant="contained" onClick={()=>{window.history.go(-2)}} endIcon={<AddCircleIcon />}> Return to tracking </Button>
          </Grid>
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
