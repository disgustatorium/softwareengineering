import { useState } from 'react';
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


const category = [
    { label: "Weight" },
    { label: "Calories" },
    { label: "Exercise" }
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

export default function AddGoal() {
    const [value, setValue] = useState(dayjs());


    return (
        <Container sx={
            { padding: "30px" }
        } maxWidth="sm">
           
            <Typography variant="h2" component="h1" gutterBottom> Add goal </Typography>
                <Item>
                <Grid container direction="column" rowGap={2} maxWidth="sm">
            <TextField id="goalName" label="Goal name" variant="outlined" />
            <Autocomplete
                fullWidth
                id="category_options"
                options={category}
                renderInput={(params) => <TextField {...params} label="Category" />}
            />

            <DatePicker
                label="Start date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
            />
            <DatePicker
                label="End date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
            />
              <Button variant="contained" component={Link} to="addGoal" endIcon={<AddCircleIcon />}> Add </Button>
            </Grid>
            </Item>
          
        </Container>
    );
}