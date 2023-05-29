import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProfileCircleButton from "../../components/ProfileCircleButton";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function WeightChart() {  
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(false);
  
  var data = {
    datasets: [
      {
        label: "Weight",
        data: chartData,
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }

  useEffect(() => { 
    if(!response) {
      let requestJson = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1Mzc1NzIyLCJleHAiOjE2ODUzODI5MjJ9.wR1gmEJrcSXaZwRpdmFtOprQ9aLTYcZ6008iOxf_qQU"};
      fetch('http://localhost:3001/getWeightRecords',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
        if (data.success) { 
          setChartData(data.data.map((data) => ({"x":new Date(data.dateRecorded).getTime(), "y":data.weight})));
          setResponse(true);
          console.log("H");
        }
      }).catch((err) => {console.log(err.message);});
    }
  });

  return (
    <div className="chart-container">
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              type: "time",
              time : {
                unit: "month"
              }
            }
          }
        }}
      />
    </div>
  );
}

function ExerciseChart() {  
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(false);
  
  var data = {
    datasets: [
      {
        label: "Exercise",
        data: chartData,
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }

  useEffect(() => { 
    if(!response) {
      let requestJson = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1Mzc1NzIyLCJleHAiOjE2ODUzODI5MjJ9.wR1gmEJrcSXaZwRpdmFtOprQ9aLTYcZ6008iOxf_qQU"};
      fetch('http://localhost:3001/getExerciseMonthly',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
        if (data.success) { 
          setChartData(data.data.map((data) => ({"x":new Date(data.dateRecorded).getTime(), "y":data.hours})));
          setResponse(true);
        }
      }).catch((err) => {console.log(err.message);});
    }
  });


  return (
    <div className="chart-container">
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              type: "time",
              time : {
                unit: "month"
              }
            }
          }
        }}
      />
    </div>
  );
}

function CaloriesChart() {  
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(false);
  
  var data = {
    datasets: [
      {
        label: "Exercise",
        data: chartData,
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }

  useEffect(() => { 
    if(!response) {
      let requestJson = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1Mzc1NzIyLCJleHAiOjE2ODUzODI5MjJ9.wR1gmEJrcSXaZwRpdmFtOprQ9aLTYcZ6008iOxf_qQU"};
      fetch('http://localhost:3001/getCaloriesMonthly',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
        if (data.success) { 
          setChartData(data.data.map((data) => ({"x":new Date(data.dateRecorded).getTime(), "y":data.calories})));
          setResponse(true);
        }
      }).catch((err) => {console.log(err.message);});
    }
  });


  return (
    <div className="chart-container">
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: false
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              type: "time",
              time : {
                unit: "month"
              }
            }
          }
        }}
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <Container sx={{marginTop: "20px"}}>
      <Item>
        <Grid sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <ProfileCircleButton />
        </Grid>
        <Grid container sx={{textAlign: "center", display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Grid xs={5}> <h2>Exercise</h2> <ExerciseChart /> </Grid>
          <Grid xs={1} />
          <Grid xs={5}> <h2>Calories</h2> <CaloriesChart /> </Grid>
          <Grid xs={5}> <h2>Weight</h2> <WeightChart /> </Grid>
        </Grid>
      </Item>
    </Container>
  );
}
