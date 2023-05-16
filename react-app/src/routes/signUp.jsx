import theme from '../theme';
import '../Landing.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

import { Typography, Button, ThemeProvider, Box } from '@mui/material';


export default function SignUp() {

  const registerUser = async (formData) => {
    
    const backendUrl = 'http://localhost:3001';

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Registration successful');
      } else {
        console.log(`Registration failed: ${data.reason}`);
      }
    } catch (error) {
      console.log('Error occurred during registration:', error);
    }
  };

  // registration data 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    units: '',
    height: '',
    dob: '',
  });

  // changing units 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // submitting other fields
  const handleSubmit = (event) => {

    // check for missing fields
    const missingFields = [];
    if (!event.target.username.value) missingFields.push("Username");
    if (!event.target.password.value) missingFields.push("Password");
    if (!event.target.email.value) missingFields.push("Email");
    if (!event.target.firstName.value) missingFields.push("First Name");
    if (!event.target.lastName.value) missingFields.push("Email");
    if (!event.target.gender.value) missingFields.push("Gender");
    if (!event.target.height.value) missingFields.push("Height");
    if (!event.target.units.value) missingFields.push("Units");
    if (!event.target.dob.value) missingFields.push("DOB");

    // if there are missing fields, notify the user
    if (missingFields.length > 0) {
      const missingFieldsString = missingFields.join(", ");
      alert(`Please fill in the following fields: ${missingFieldsString}`);
      return; 
    }
      
    const updatedData = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      gender: event.target.gender.value,
      height: event.target.height.value,
      units: event.target.units.value,
      dob: event.target.dob.value
    };

    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));

    registerUser(formData);

  };

  return (
    <ThemeProvider theme={theme}>
    <div
      style={{
        backgroundColor: 'white',
        maxWidth: '80%',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        marginTop: '50vh',
        transform: 'translateY(-50%)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
      <Typography variant="h1" color="primary.main"> Welcome to FitTrack! </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
      <Typography variant="h5" color="primary.main"> Measurement Units: </Typography>
      </div>

      <form onSubmit={handleSubmit}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Username: </Typography>
        </div>
        <label htmlFor="username"></label>
        <input type="text" id="username" />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main">Password:</Typography>
        </div>
        <label htmlFor="password"></label>
        <input type="password" id="password" />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Email: </Typography>
        </div>
        <label htmlFor="email"></label>
        <input type="email" id="email" />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> First Name: </Typography>
        </div>
        <label htmlFor="firstName"></label>
        <input type="text" id="firstName" />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Last Name: </Typography>
        </div>
        <label htmlFor="lastName"></label>
        <input type="text" id="lastName" />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Sex: </Typography>
        </div>
        <label htmlFor="gender"></label>
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Birthday: </Typography>
        </div>
        <label htmlFor="dob"></label>
        <input type="date" id="dob" name="dob" />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Units: </Typography>
        </div>
        <label htmlFor="units"></label>
        <input type="radio" id="metric" name="units" value="metric" onChange={handleChange} />
        <label htmlFor="metric">Metric</label>
        <input type="radio" id="imperial" name="units" value="imperial" onChange={handleChange} />
        <label htmlFor="imperial">Imperial</label>
        <br /> 

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Height: </Typography>
        </div>
        {formData.units === "metric" && (
          <div>
            <label htmlFor="height">Height (in cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              min="0"
              step="1"
              pattern="[0-9]*"
              onChange={handleChange}
            />
          </div>
        )}

        {formData.units === "imperial" && (
          <div>
            <label htmlFor="height">Height (in inches):</label>
            <input
              type="number"
              id="height"
              name="height"
              min="0"
              step="1"
              pattern="[0-9]*"
              onChange={handleChange}
            />
          </div>
      )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
    </ThemeProvider>

  );
}
