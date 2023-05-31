import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../../components/AddGoalButton';
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
          var quantityDict = {"Exercise":"? hours","CaloriesOver":"? kcal","CaloriesUnder":"? kcal","WeightGain":"? kg","WeightLoss":"? kg"}
          // TODO: Check if user's setting is imperial and the category is weight - if so, convert to KG, and swap quantity to lbs
          let name = nameDict[goal.category].replace("?",quantityDict[goal.category].replace("?",goal.quantity));
          return <GoalsListItem key={goal.goalID} name={name} endDate={goal.endDate.substring(0,10)} daysLeft={Math.floor((Date.parse(goal.endDate) - new Date())/(1000*3600*24)+1)} />
        })}
      </Grid>
    )
  }
}

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1NTM5MzE2LCJleHAiOjE2ODU1NDY1MTZ9.2tdVBVduZsvXIPT2SMn2kBZi39wemKHCWrQw2FVmX50";

export default class Goals extends React.Component {
  state = {"goals":[]};
  componentDidMount() {
    let requestJson = {"token":userToken};
    fetch('http://localhost:3001/getGoals',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.setState({"goals":data.data});
    }).catch((err) => {console.log(err.message);});
  };
  render() {
    return (
      <Container sx={
        {
          padding: "30px", marginBottom: "76px"
        }
      } maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom> Goals </Typography>
        <AddGoalButton></AddGoalButton>
        <GoalsList goals={this.state.goals}/>
      </Container>
    );
  }
}

