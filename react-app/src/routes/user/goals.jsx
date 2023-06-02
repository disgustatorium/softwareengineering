import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../../components/AddGoalButton';
import GoalsSuggetions from '../../components/suggestionDisplay';
import React from "react";
import { useNavigate } from "react-router-dom"
import { userToken } from './root'; // Path to the Root component file

import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

function GoalsListItem({ name, endDate, daysLeft }) {

  const navigate = useNavigate();

  if (!userToken) {
    navigate('/login'); 
  } else {
    console.log(userToken);
  }

  return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Grid container xs={8}>
          <Grid xs={12}>
            <Typography variant='h5'> Goal: {name} </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant='h6'> End date: {endDate} </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center" direction="column" xs={4}>
          <Grid xs={3} > 
            <Typography variant='h3'> 
              {daysLeft} 
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant='h6'>
              days left
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  )
}

class GoalsList extends React.Component {
  render() {
    return (
      <Grid container direction="column" rowGap={2} maxWidth="sm">
        {this.props.goals.filter(goal => (Date.parse(goal.endDate) - new Date()) > 0).map(goal => {
          const nameDict = {"Exercise":"Exercise ?","CaloriesOver":"Calories over ?","CaloriesUnder":"Calories under ?","WeightGain":"Gain ?","WeightLoss":"Gain ?"};
          var quantityDict = {"Exercise":"? hours","CaloriesOver":"? kcal","CaloriesUnder":"? kcal","WeightGain":"? kg","WeightLoss":"? kg"}
          // TODO: Check if user's setting is imperial and the category is weight - if so, convert to KG, and swap quantity to lbs
          let name = nameDict[goal.category].replace("?",quantityDict[goal.category].replace("?",goal.quantity));
          return <GoalsListItem key={goal.goalID} name={name} endDate={goal.endDate.substring(0,10)} daysLeft={Math.floor((Date.parse(goal.endDate) - new Date())/(1000*3600*24)+1)} />
        })}
      </Grid>
    )
  }
}

export default class Goals extends React.Component {
  state = { "goals": [], "suggestions": [] };
  
  componentDidMount() {
    let requestJson = { "token": userToken };
    fetch('http://localhost:3001/getGoals', { method: 'POST', body: JSON.stringify(requestJson), headers: { 'Content-type': 'application/json; charset=UTF-8' }, }).then((response) => response.json()).then((data) => {
      if (data.success) this.setState({ "goals": data.data });
    }).catch((err) => { console.log(err.message); });

    let requestJson2 = { "token": userToken };
    fetch('http://localhost:3001/goalSuggestions', { method: 'POST', body: JSON.stringify(requestJson2), headers: { 'Content-type': 'application/json; charset=UTF-8' }, }).then((response) => response.json()).then((data) => {
      if (data.success) this.setState({ "suggestions": data.data });
    }).catch((err) => { console.log(err.message); });
  };
  render() {
    // let [suggestions, setSuggetsions] = useState(["sugg 1", "sugg 2 ", "sugg 3"]);
    // let suggestions = ["sugg 1", "sugg 2 ", "sugg 3"];
    return (
      <Container sx={
        {
          padding: "30px"
        }
      } maxWidth="sm">
        <Item>
          <Typography variant="h2" component="h1" gutterBottom> Goals </Typography>
          <Grid container direction="column" rowGap={2} maxWidth="sm">
            <AddGoalButton></AddGoalButton>
            <GoalsSuggetions suggestions={this.state.suggestions} />
            <GoalsList goals={this.state.goals} />
          </Grid>
        </Item>
      </Container>
    );
  }
}

