import { useRef, useState } from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJuYW1lIjoidGVzdC11c2VyIiwiaWF0IjoxNjg1NTYxOTI3LCJleHAiOjE2ODU1NjkxMjd9.MNhZZkOgYtsoeQz10naWhde_RTCaHfWFYSqPjwpeXx0";

export default function AddGroup() {
    return (
        <Container sx={
	    { padding: "30px"}
	} maxWidth="sm">
	
	        <Item>
                <Typography variant="h2" component="h1" gutterBottom> Add group </Typography>
	        <Grid container direction="column" rowGap={2} maxWidth="sm">
            <TextField 
                label="Group name"
                variant="outlined"
            />
            <TextField 
                label="Members"
                variant="outlined"
                select
            />
	      <Button variant="contained" endIcon={<AddCircleIcon />}> Add </Button>
	    </Grid>
	    </Item>
	  
	</Container>
    );
  }