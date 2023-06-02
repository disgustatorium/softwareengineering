import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useNavigate } from "react-router-dom"
import { userToken } from '../root'; 

const mealCategories = [{label:"Breakfast"},{label:"Lunch"},{label:"Dinner"},{label:"Snack"}]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function CustomFood() {

  const navigate = useNavigate();

  if (!userToken) {
    navigate('/login'); 
  } else {
    console.log(userToken);
  }

    const [formDate, setDate] = useState(dayjs());
    const [category, setCategory] = useState();
    const [foodName, setFoodName] = useState();
    const [quantity, setQuantity] = useState();

    function submitFood() {
        var formData = { "timeRecorded":category.target.textContent,
        "foodType":0,
        "customName":foodName.target.value,
        "quantity":quantity.target.value,
        "dateRecorded":formDate["$d"].toISOString().split('T')[0],
        };
	if (!formData.timeRecorded || !formData.customName || !formData.quantity || !formData.dateRecorded) {
	  alert("Please ensure all fields are filled.");
	  return;
	}
        let requestJson = {"token":window.localStorage.getItem("token"),"data":formData};
        fetch('http://localhost:3001/recordFood',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = ".../addSuccess";
            else console.log(data);
        }).catch((err) => {console.log(err.message);});
    }

  const [value, setValue] = useState(dayjs());
    return (
      
    <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
        
        <Typography variant="h2" component="h1" gutterBottom>Log custom food</Typography>
            <Item>
            <Grid container direction="column" rowGap={2} maxWidth="sm">
            
        <Autocomplete
            fullWidth
            id="category_options"
            options={mealCategories}
            renderInput={(params) => <TextField {...params} label="Meal category" />}
            onChange={(newValue) => setCategory (newValue)}
        />
        
        <TextField 
            label="Custom Name"
            variant="outlined"
            onChange={(newValue) => setFoodName(newValue)}
        />
        
        <TextField 
            label="Calories"
            variant="outlined"
            onChange={(newValue) => setQuantity(newValue)}
        />
        
        <DatePicker
            label="Date"
            value={formDate}
            onChange={(newValue) => setDate(newValue)}
        />
        
        <Button variant="contained" onClick={submitFood} endIcon={<RamenDiningIcon />}>Log Custom Food</Button>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }
