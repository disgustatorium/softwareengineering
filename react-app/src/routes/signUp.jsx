import theme from '../theme';
import '../Landing.css';
import { useState } from 'react';
import { Typography, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom"

export default function SignUp() {

  const navigate = useNavigate();

  // post request to /send-email endpoint in order to email a user
  const sendEmail = async (to, name, subject, file) => {

    const backendUrl = 'http://localhost:3001';
    
    try {
      const response = await fetch(`${backendUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, name, subject, file }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Email sent successfully:', data.message);
      } else {
        console.error('Error sending email:', data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  // post request to /register endpoint in order to register user 
  const registerUser = async (formData, onSuccess, onError) => {
    
    const backendUrl = 'http://localhost:3001';

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);


      if (data.success) {
        console.log('Registration successful');
        onSuccess(); 
      } else {
        console.log(`Registration failed: ${data.reason}`);
        onError(data.reason);
      }
    } catch (error) {
      console.log('Error occurred during registration:', error);
      onError('Error occurred during registration');
    }
    
  };

  // state to update and hold registration data 
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

  // changing registration data on change 
  const handleChange = (event) => { 
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // submitting registration data
  const handleSubmit = (event) => {
    event.preventDefault(); 

    // check for missing fields
    const missingFields = [];
    if (!event.target.username.value) missingFields.push("Username");
    if (!event.target.password.value) missingFields.push("Password");
    if (!event.target.email.value) missingFields.push("Email");
    if (!event.target.firstName.value) missingFields.push("First Name");
    if (!event.target.lastName.value) missingFields.push("Last Name");
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

    const onSuccess = () => {
      // sends email to user confirming signup
      const to = event.target.email.value;
      const name = event.target.firstName.value;
      const subject = "Signup Successful!";
      const file = "success.html";
    
      sendEmail(to, subject, file);
    
      // redirects user to sign up successful page 
      navigate('/signUpSuccess');
    };

    const onError = (reason) => {
      alert(`Registration failed: ${reason}`);
    };

    // register user
    registerUser(formData, onSuccess, onError);

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
        alignItems: 'center',
        marginTop: '10vh',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
      <Typography variant="h1" color="primary.main"> Welcome to FitTrack! </Typography>
      </div>

      <form onSubmit={handleSubmit}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Username: </Typography>
        </div>
        <label htmlFor="username"></label>
        <input type="text" id="username" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main">Password:</Typography>
        </div>
        <label htmlFor="password"></label>
        <input type="password" id="password" autoComplete="new-password" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Email: </Typography>
        </div>
        <label htmlFor="email"></label>
        <input type="email" id="email" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> First Name: </Typography>
        </div>
        <label htmlFor="firstName"></label>
        <input type="text" id="firstName" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Last Name: </Typography>
        </div>
        <label htmlFor="lastName"></label>
        <input type="text" id="lastName" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Sex: </Typography>
        </div>
        <label htmlFor="gender"></label>
        <input type="radio" id="gender" name="gender" value="M" onChange={handleChange} />
        <label htmlFor="M">Male</label>
        <input type="radio" id="gender" name="gender" value="F" onChange={handleChange} />
        <label htmlFor="F">Female</label>
        <input type="radio" id="gender" name="gender" value="X" onChange={handleChange} />
        <label htmlFor="X">Other</label>
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Birthday: </Typography>
        </div>
        <label htmlFor="dob"></label>
        <input type="date" id="dob" name="dob" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Preferred Units: </Typography>
        </div>
        <label htmlFor="units"></label>
        <input type="radio" id="units" name="units" value="M" onChange={handleChange} />
        <label htmlFor="metric">Metric</label>
        <input type="radio" id="units" name="units" value="I" onChange={handleChange} />
        <label htmlFor="imperial">Imperial</label>
        <br /> 

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
        <Typography variant="h5" color="primary.main"> Height: </Typography>
        </div>
        {formData.units === "M" && (
          <div>
            
            <input
              type="number"
              id="height"
              name="height"
              min="0"
              step="1"
              pattern="[0-9]*"
              onChange={handleChange}
            />
            <label htmlFor="height">(cm)</label>
            <br />
          </div>
        )}

        {formData.units === "I" && (
          <div>
            
            <input
              type="number"
              id="height"
              name="height"
              min="0"
              step="1"
              size="4"
              pattern="[0-9]*"
              onChange={handleChange}
            />
            <label htmlFor="height">(inches)</label>
          </div>
        )}

        {formData.units !== "M" && formData.units !== "I" && (
          <div>
            <label htmlFor="height"></label>
            <input type="number" id="height" readOnly style={{ backgroundColor: '#f0f0f0', color: '#888888' }} onChange={handleChange} />
          </div>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
    </ThemeProvider>
  );
}
