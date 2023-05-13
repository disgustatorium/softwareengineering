import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../components/AddGoalButton';
import AddGroup from './addGroup';
import AddGroupButton from '../components/AddGroupButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const GROUPS = [
  { name: "Apple", category: "Fruits", goal: "Lose 5kg", startDate: new Date(1), endDate: new Date(3), members: "" },
  { name: "Ae", category: "Fruits", goal: "Gain 10kg", startDate: new Date(8.64e15), endDate: new Date(8.64e15), members: "aaa" },
  { name: "PEar", category: "Fr", goal: "2000 cal per day", startDate: new Date(8.64e15), endDate: new Date(8.64e15), members: "ba" },
]

function GroupListItem({ name, goal, members }) {
  return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Grid container xs={8}>
          <Grid xs={12}>
            <Typography variant='h5'> Group name: {name} </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant='h6'> Current goal: {goal} </Typography>
          </Grid>
        </Grid>
        <Grid xs={12}>
            <Typography variant='h6'> Members: {members} </Typography>
          </Grid>
        </Grid>
    </ Item>
  )
}

function GroupList({ group }) {
  return (
    <Grid container direction="column" rowGap={2} maxWidth="sm">
      {group.map(group => {
        return <GroupListItem key={group.name} name={group.name} goal={group.goal} members={group.members} />
      })}
    </Grid>
  )
}


export default function Groups() {
    return (
      <Container sx={
        {
  
          padding: "30px"
        }
      } maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom> Your groups </Typography>
        <AddGroupButton></AddGroupButton>
        {/* 
        group search bar */}
        <GroupList group={GROUPS} />
      </Container>
    );
  }