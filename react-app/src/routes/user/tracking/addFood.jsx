import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

const mealCategories = [{label:"Breakfast"},{label:"Lunch"},{label:"Dinner"},{label:"Snack"}]
const foodTypes = [{label:"Big Mac"},{label:"Chicken Nuggets"},{label:"Large Fries"},{label:"Small Fries"}]
const typeIDs = {"Big Mac":1,"Chicken Nuggets":2,"Large Fries":3,"Small Fries":4}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1NTM5MzE2LCJleHAiOjE2ODU1NDY1MTZ9.2tdVBVduZsvXIPT2SMn2kBZi39wemKHCWrQw2FVmX50";

export default function AddFood() {
    const [formDate, setDate] = useState(dayjs());
    const [category, setCategory] = useState();
    const [type, setType] = useState();
    const [quantity, setQuantity] = useState();
    
    
    function submitFood() {
        var formData = { "timeRecorded":category.target.textContent,
        "foodType":type.target.textContent,
        "quantity":quantity.target.value,
        "dateRecorded":formDate["$d"].toISOString().split('T')[0],
        };
	if (!formData.timeRecorded || !formData.foodType || !formData.quantity || !formData.dateRecorded) {
	  alert("Please ensure all fields are filled.");
	  return;
	}
	formData.foodType = typeIDs[formData.foodType];
        let requestJson = {"token":userToken,"data":formData};
        fetch('http://localhost:3001/recordFood',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = "../addSuccess";
            else console.log(data);
        }).catch((err) => {console.log(err.message);});
    }
    
    
    return (
      
    

    <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
        
        <Typography variant="h2" component="h1" gutterBottom>Log food</Typography>
            <Item>
            <Grid container direction="column" rowGap={2} maxWidth="sm">
            
        <Autocomplete
            fullWidth
            id="category_options"
            options={mealCategories}
            renderInput={(params) => <TextField {...params} label="Meal category" />}
            onChange={(newValue) => setCategory (newValue)}
        />
        
        <Autocomplete
            fullWidth
            id="food_options"
            options={foodTypes}
            renderInput={(params) => <TextField {...params} label="Food type" />}
            onChange={(newValue) => setType(newValue)}
        />
        
        <TextField 
            label="Quantity"
            variant="outlined"
            onChange={(newValue) => setQuantity(newValue)}
        />
        
        <DatePicker
            label="Date"
            value={formDate}
            onChange={(newValue) => setDate(newValue)}
        />
        <Button variant="contained" onClick={submitFood} endIcon={<RestaurantIcon />}> Log Food</Button>
        <Button variant="contained" component={Link} to="customFood" endIcon={<RamenDiningIcon />}>Custom Food</Button>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }
