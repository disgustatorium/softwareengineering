import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function AppSettings() {
  const [newEmail, setNewEmail] = useState();
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  function saveChanges() {
    

    var formData = { "newEmail":newEmail.target.textContent};
    var formData = { "newFirstName":newFirstName.target.textContent};
    var formData = { "newLastName":newLastName.target.textContent};

    let requestJson = {"token":window.localStorage.getItem("token"),"data":formData};
    fetch('http://localhost:3001/appSettings',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
        if (data.success) window.location.href = "../addSuccess";
        else console.log(data);
    }).catch((err) => {console.log(err.message);});
}

    return (
      <Container sx={
        { padding: "30px" }
       } maxWidth="sm">
        
        <Typography variant="h2" component="h1" gutterBottom>Settings</Typography>
            <Item>
            <Grid container direction="column" rowGap={2} maxWidth="sm">
                  
            <TextField 
            label="New Email"
            variant="outlined"
            onChange={(newValue) => setNewEmail(newValue)}
        />
        <TextField 
            label="New First name"
            variant="outlined"
            onChange={(newValue) => setNewFirstName(newValue)}
        />
        <TextField 
            label="New Last Name"
            variant="outlined"
            onChange={(newValue) => setNewLastName(newValue)}
        />

        <Button variant="contained" onClick={saveChanges}> Save Changes</Button>
        </Grid>
       </Item>
    </Container>
    );
  }