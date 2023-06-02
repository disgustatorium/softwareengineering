import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
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


export default function AddGoal() {
    const [type, setType] = useState();
    const [quantity, setQuantity] = useState();
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const categoryDict = {"Exercise (hours)":"Exercise","Calories Over (kcal)":"CaloriesOver","Calories Under (kcal)":"CaloriesUnder","Weight Gain (kg)":"WeightGain","Weight Loss (kg)":"WeightLoss"}
    const category = [
        { label: "Weight Loss (kg)"},
        { label: "Weight Gain (kg)"},
        { label: "Calories Under (kcal)"},
        { label: "Calories Over (kcal)"},
        { label: "Exercise (hours)" }
    ]
    
    
    function submitGoal() {
        // TODO: Check if user's setting is imperial and the category is weight - if so, convert to KG, and swap quantity to lbs
        var formData = { "category":categoryDict[type.target.textContent],
        "quantity":quantity.target.value,
        "startDate":startDate["$d"].toISOString().split('T')[0],
        "endDate":endDate["$d"].toISOString().split('T')[0]
        };
	if (!formData.category || !formData.quantity || !formData.startDate || !formData.endDate) {
	  alert("Please ensure all fields are filled.");
	  return;
	}        
        if (formData.startDate == formData.endDate) {
          alert("Please ensure start date and end date are not the same.");
          return;
        }
        if (formData.startDate < new Date(Date.UTC()) || formData.endDate < new Date(Date.UTC())) {
          alert("Please ensure start date and/or end date are not in the past.");
          return;
        }
        let requestJson = {"token":window.localStorage.getItem("token"),"data":formData};
        fetch('http://localhost:3001/registerGoal',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = "../addSuccess";
        }).catch((err) => {console.log(err.message);});
    }

    return (
        <Container sx={
            { padding: "30px", marginBottom: "76px" }
        } maxWidth="sm">

            <Item>
                <Typography variant="h2" component="h1" gutterBottom> Add goal </Typography>
                
                <Grid container direction="column" rowGap={2} maxWidth="sm">
                    <Autocomplete
                        fullWidth
                        onChange={(newValue) => setType(newValue)}
                        id="category_options"
                        options={category}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        onChange={(newValue) => setQuantity(newValue)}
                    />
                    <DatePicker
                        label="Start date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                    <DatePicker
                        label="End date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                    />
                    <Button variant="contained" onClick={submitGoal} endIcon={<AddCircleIcon />}> Add goal</Button>
                </Grid>
            </Item>

        </Container>
    );
}
