// import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import AddGoalButton from '../../components/AddGoalButton';
import React from "react";
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

function GoalsSuggetions({ suggestions }) {
  return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Typography variant='h5'> Goal suggestions: </Typography>
        <Typography variant="h6" gutterBottom>
          {suggestions[0]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {suggestions[1]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {suggestions[2]}
        </Typography>

      </Grid>
    </Item>
  )
}

export default GoalsSuggetions;
