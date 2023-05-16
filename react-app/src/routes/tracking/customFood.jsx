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
import CustomFoodButton from '../../components/CustomFoodButton';

const mealCategories = [{label:"Breakfast"},{label:"Lunch"},{label:"Dinner"},{label:"Snack"}]
const customFood = [{label:"Custom Food"}]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function AddCustomFood() {
  const [value, setValue] = useState(dayjs());
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
            renderInput={(params) => <TextField {...params} label="Meal type" />}
        />
        <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
        />
        <Button variant="contained" component={Link} to="addFood" endIcon={<RestaurantIcon />}> Log Food</Button>
        <CustomFoodButton></CustomFoodButton>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }