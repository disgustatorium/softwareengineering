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
import { TimeField } from '@mui/x-date-pickers/TimeField';

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

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJuYW1lIjoidGVzdC11c2VyIiwiaWF0IjoxNjg1NTYxOTI3LCJleHAiOjE2ODU1NjkxMjd9.MNhZZkOgYtsoeQz10naWhde_RTCaHfWFYSqPjwpeXx0";

export default function AddExercise() {
    const [formDate, setDate] = useState(dayjs());
    const [type, setType] = useState();
    const [duration, setDuration] = useState(dayjs());
    
    function submitExercise() {
        var formData = { "type":type.target.textContent,
        "hours":(duration["$H"]+(duration["$m"]/60)),
        "dateRecorded":formDate["$d"].toISOString().split('T')[0],
        };
	if (!formData.type || !formData.hours || !formData.dateRecorded) {
	  alert("Please ensure all fields are filled.");
	  console.log(formData);
	  return;
	}
      let requestJson = {"token":window.localStorage.getItem("token"),"data":formData};
        fetch('http://localhost:3001/recordExercise',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = "../addSuccess";
            else console.log(data);
        }).catch((err) => {console.log(err.message);});
    }
    
    
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
            onChange={(newValue) => setType(newValue)}
            renderInput={(params) => <TextField {...params} label="Activity" />}
        />
        <DatePicker
            label="Date"
            value={formDate}
            onChange={(newValue) => setDate(newValue)}
        />
        <TimeField id="exerciseDuration" onChange={(newValue) => setDuration(newValue)} label="Duration " />
        <Button variant="contained" onClick={submitExercise} endIcon={<FitnessCenterIcon />}> Log Exercise</Button>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }

  
