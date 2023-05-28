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
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProfileCircleButton from "../../components/ProfileCircleButton";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              type: "time"
            }
          }
        }}
      />
    </div>
  );
}

export default function Dashboard() {
  const Data = [
    {"weightRecordID":"1","ownerID":"2","dateRecorded":"2023-05-10","weight":"89.60000"},
    {"weightRecordID":"2","ownerID":"2","dateRecorded":"2023-05-01","weight":"93.10000"},
    {"weightRecordID":"3","ownerID":"2","dateRecorded":"2023-03-01","weight":"102.70000"},
    {"weightRecordID":"4","ownerID":"2","dateRecorded":"2023-02-01","weight":"107.20000"},
    {"weightRecordID":"5","ownerID":"2","dateRecorded":"2023-01-01","weight":"111.90000"}
  ];

  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "Weight",
        data: Data.map((data) => ({"x":new Date(data.dateRecorded).getTime(), "y":data.weight})),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  
  console.log(chartData.datasets[0].data);
  
  return (
    <Container>
      <Item>
        <ProfileCircleButton></ProfileCircleButton>
        <LineChart chartData={chartData} />
      </Item>
    </Container>
  );
}
