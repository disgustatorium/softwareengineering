import theme from '../theme';
import '../Landing.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Typography, Button, ThemeProvider, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


export default function LogIn() {

  const navigate = useNavigate();

  // checks if you have a valid token and redirects to your account if you do
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const token = document.cookie;
    const cleanedToken = token.replace("token=", "").trim();
    setUserToken(cleanedToken);
  }, []);

  useEffect(() => {
    if (userToken !== "") {
      navigate('/user/dashboard');
    }
  }, [userToken, navigate]);

  // post request to /register endpoint in order to register user 
  const loginUser = async (formData, onSuccess, onError) => {
    
    const backendUrl = 'http://localhost:3001';
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      //window.localStorage.setItem("token", data.token)


      if (data.success) {
        console.log('Login successful');
        document.cookie = `token=${data.token}; path=/; SameSite=None; Secure`;
        onSuccess(); 
      } else {
        console.log(`Login failed: ${data.reason}`);
        onError(data.reason);
      }
    } catch (error) {
      console.log('Error occurred during login:', error);
      onError('Error occurred during login');
    }
    
  };

  // state to update and hold login data 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // changing login data on change 
  const handleChange = (event) => { 
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // submitting login data
  const handleSubmit = (event) => {
    event.preventDefault(); 

    // check for missing fields
    const missingFields = [];
    if (!event.target.username.value) missingFields.push("Username");
    if (!event.target.password.value) missingFields.push("Password");

    // if there are missing fields, notify the user
    if (missingFields.length > 0) {
      const missingFieldsString = missingFields.join(", ");
      alert(`Please fill in the following fields: ${missingFieldsString}`);
      return; 
    }

    const onSuccess = () => {
      // redirects user to dashboard
      navigate('/user/dashboard');
    };

    const onError = (reason) => {
      alert(`Login failed: ${reason}`);
    };

    // register user
    loginUser(formData, onSuccess, onError);

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
      <Typography variant="h1" color="primary.main"> Welcome back to FitQuest! </Typography>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container direction="column" rowGap={2} maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h5" color="primary.main"> Username: </Typography>
        </div>
        <label htmlFor="username"></label>
        <input type="text" id="username" onChange={handleChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h5" color="primary.main">Password:</Typography>
        </div>
        <label htmlFor="password"></label>
        <input type="password" id="password" autoComplete="new-password" onChange={handleChange} />
        <br />
      
        <Button variant="contained" type="submit">Login</Button>
        </Grid>
      </form>
    </div>
    </ThemeProvider>
  );
}
