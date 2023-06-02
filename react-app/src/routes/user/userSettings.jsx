import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export default function UserSettings() {
  const [newEmail, setNewEmail] = useState();
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  function saveChanges() {


    var formData = { "newEmail": newEmail.target.textContent };
    var formData = { "newFirstName": newFirstName.target.textContent };
    var formData = { "newLastName": newLastName.target.textContent };

    let requestJson = { "token": window.localStorage.getItem("token"), "data": formData };
    fetch('http://localhost:3001/appSettings', { method: 'POST', body: JSON.stringify(requestJson), headers: { 'Content-type': 'application/json; charset=UTF-8' }, }).then((response) => response.json()).then((data) => {
      if (data.success) window.location.href = "../addSuccess";
      else console.log(data);
    }).catch((err) => { console.log(err.message); });
  }

  return (
    <Container sx={
      { padding: "30px" }
    } maxWidth="sm">
      <Item>
        <Typography variant="h2" component="h1" gutterBottom>Account settings</Typography>
        <Grid container direction="column" rowGap={2} maxWidth="sm">

          <TextField
            label="New email address"
            variant="outlined"
            onChange={(newValue) => setNewEmail(newValue)}
          />
          <TextField
            label="New first name"
            variant="outlined"
            onChange={(newValue) => setNewFirstName(newValue)}
          />
          <TextField
            label="New last name"
            variant="outlined"
            onChange={(newValue) => setNewLastName(newValue)}
          />
          <FormControl>
            <FormLabel id="sex-radio-buttons">Sex</FormLabel>
            <RadioGroup>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={saveChanges}> Save Changes</Button>
          <Button variant="contained" onClick={saveChanges}> Log out</Button>
        </Grid>
      </Item>
    </Container>
  );
}