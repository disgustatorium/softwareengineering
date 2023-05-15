import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../components/AddGoalButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const GOALS = [
  { name: "Apple", category: "Fruits", target: "Lose 5kg", startDate: new Date(1), endDate: new Date(3) },
  { name: "Ae", category: "Fruits", target: "Gain 10kg", startDate: new Date(8.64e15), endDate: new Date(8.64e15) },
  { name: "PEar", category: "Fr", target: "2000 cal per day", startDate: new Date(8.64e15), endDate: new Date(8.64e15) },
]

function GoalsListItem({ name, target, daysLeft }) {
  return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Grid container xs={8}>
          <Grid xs={12}>
            <Typography variant='h5'> Name: {name} </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant='h6'> Target: {target} </Typography>
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

function GoalsList({ goals }) {
  return (
    <Grid container direction="column" rowGap={2} maxWidth="sm">
      {goals.map(goal => {
        return <GoalsListItem key={goal.name} name={goal.name} target={goal.target} daysLeft={goal.endDate - goal.startDate} />
      })}
    </Grid>
  )
}

export default function Goals() {
  return (
    <Container sx={
      {

        padding: "30px"
      }
    } maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom> Goals </Typography>
      <AddGoalButton></AddGoalButton>
      <GoalsList goals={GOALS} />
    </Container>
  );
}
