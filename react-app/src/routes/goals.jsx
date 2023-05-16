import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../components/AddGoalButton';
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function GoalsListItem({ name, endDate, daysLeft }) {
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
        {this.props.goals.map(goal => {
          const nameDict = {"Exercise":"Exercise ?","CaloriesOver":"Calories over ?","CaloriesUnder":"Calories under ?","WeightGain":"Gain ?","WeightLoss":"Gain ?"};
          const quantityDict = {"Exercise":"? hours","CaloriesOver":"?","CaloriesUnder":"?","WeightGain":"? kg","WeightLoss":"? kg"}
          // TODO: Check if user's setting is imperial and the category is weight - if so, convert and swap quantity
          let name = nameDict[goal.category].replace("?",quantityDict[goal.category].replace("?",goal.quantity));
          return <GoalsListItem key={goal.goalID} name={name} endDate={goal.endDate.substring(0,10)} daysLeft={(Date.parse(goal.endDate) - Date.parse(goal.dateCreated))/(1000*3600*24)} />
        })}
      </Grid>
    )
  }
}


export default class Goals extends React.Component {
  state = {"goals":[]};
  componentDidMount() {
    let requestJson = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJuYW1lIjoidGVzdC11c2VyIiwiaWF0IjoxNjg0MjUyNzk2LCJleHAiOjE2ODQyNTk5OTZ9.SmG7bmiaSgC4h12pWlpOYU45onB2M_LmO9noiVA9QWg"};
    fetch('http://localhost:3001/getGoals',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.setState({"goals":data.data});
    }).catch((err) => {console.log(err.message);});
  };
  render() {
    return (
      <Container sx={
        {
          padding: "30px"
        }
      } maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom> Goals </Typography>
        <AddGoalButton></AddGoalButton>
        <GoalsList goals={this.state.goals}/>
      </Container>
    );
  }
}

