import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker, TimeClock, TimePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const exerciseCategories = [{label:"Swimming"},{label:"Running"},{label:"Snorkelling"}]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function ExerciseListItem({ category, date, duration }) {
  return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Grid container xs={8}>
          <Grid xs={12}>
            <Typography variant='h5'> Activity: {category} </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant='h6'> Date: {date} </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="exerciseCategory" justifyContent="center" direction="column" xs={4}>
        <Grid xs={6}>
            <Typography variant='h6'>
              For...
            </Typography>
          </Grid>
          <Grid xs={3} > 
            <Typography variant='h3'> 
              {duration} 
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant='h6'>
              well done!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  )
}

function ExerciseList({ exercise }) {
  return (
    <Grid container direction="column" rowGap={2} maxWidth="sm">
      {exercise.map(exercise => {
        return <ExerciseListItem category={exercise.category} date={exercise.date} duration={exercise.duration} />
      })}
    </Grid>
  )
}

export default function AddExercise() {
  const [value, setValue] = useState(dayjs());
    return (
      
    <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
       
        <Typography variant="h2" component="h1" gutterBottom>Log exercise</Typography>
            <Item>
            <Grid container direction="column" rowGap={2} maxWidth="sm">
        <Autocomplete
            fullWidth
            id="category_options"
            options={exerciseCategories}
            renderInput={(params) => <TextField {...params} label="Activity" />}
        />
        <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
        />
        <TextField id="exerciseDuration" type="time" label="Duration"></TextField>
        <Button variant="contained" component={Link} to="addExercise" endIcon={<FitnessCenterIcon />}> Log Exercise</Button>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }

  