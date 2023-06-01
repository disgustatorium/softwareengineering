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
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1NTQ2NzczLCJleHAiOjE2ODU1NTM5NzN9.H2MWihbVoE0-Y4SbQJREEOjNSVPlEstZqrbDbvZYDR4";

export default function AddGroup() {
    const [name, setName] = useState();
    
    function newGroup() {
	if (!name.target.value) {
	  alert("Please ensure all fields are filled.");
	  return;
	}        
        let requestJson = {"token":userToken,"groupName":name.target.value};
        fetch('http://localhost:3001/createGroup',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = "../groups";
        }).catch((err) => {console.log(err.message);});
    }

    return (
	<Container sx={
	    { padding: "30px", marginBottom: "76px" }
	} maxWidth="sm">
	    
	    <Typography variant="h2" component="h1" gutterBottom> New Group </Typography>
	        <Item>
	        <Grid container direction="column" rowGap={2} maxWidth="sm">
            <TextField 
                label="Name"
                variant="outlined"
                onChange={(newValue) => setName(newValue)}
            />
	      <Button variant="contained" onClick={newGroup} endIcon={<AddCircleIcon />}> Create </Button>
	    </Grid>
	    </Item>
	  
	</Container>
    );
}
