import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SpeedIcon from '@mui/icons-material/Speed';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1NTQ2NzczLCJleHAiOjE2ODU1NTM5NzN9.H2MWihbVoE0-Y4SbQJREEOjNSVPlEstZqrbDbvZYDR4";

export default function AddWeight() {
    const [formDate, setDate] = useState(dayjs());
    const [weight, setWeight] = useState();
    
    function submitWeight() {
        var formData = { "weight":weight.target.value,
        "dateRecorded":formDate["$d"].toISOString().split('T')[0],
        };
	if (!formData.weight || !formData.dateRecorded) {
	  alert("Please ensure all fields are filled.");
	  return;
	}
        let requestJson = {"token":userToken,"data":formData};
        fetch('http://localhost:3001/recordWeight',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = "../addSuccess";
            else console.log(data);
        }).catch((err) => {console.log(err.message);});
    }
    
    return (
    <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
       
        <Typography variant="h2" component="h1" gutterBottom>Log weight</Typography>
            <Item>
            <Grid container direction="column" rowGap={2} maxWidth="sm">
        <DatePicker
            label="Date"
            value={formDate}
            onChange={(newValue) => setDate(newValue)}
        />
        <TextField 
            label="Weight (kg)"
            variant="outlined"
            onChange={(newValue) => setWeight(newValue)}
        />
        <Button variant="contained" onClick={submitWeight} endIcon={<SpeedIcon />}> Log Weight</Button>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }
