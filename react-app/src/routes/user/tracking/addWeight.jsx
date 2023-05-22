import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SpeedIcon from '@mui/icons-material/Speed';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function AddWeight() {
  const [value, setValue] = useState(dayjs());
    return (
      
    <Container sx={
        { padding: "30px" }
      } maxWidth="sm">
       
        <Typography variant="h2" component="h1" gutterBottom>Log weight</Typography>
            <Item>
            <Grid container direction="column" rowGap={2} maxWidth="sm">
        <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
        />
        <TextField id="weight" label="Weight in kgs" variant="outlined" />
        <Button variant="contained" component={Link} to="addWeight" endIcon={<SpeedIcon />}> Log Weight</Button>
        </Grid>
        </Item>
      
    </Container>
      
    );
  }