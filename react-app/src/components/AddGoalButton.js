import { ThemeProvider } from '@emotion/react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AddGoalCircle() {
    return (
        <Button variant="contained" component={Link} to="addGoal" endIcon={<AddCircleIcon />}> Add goal</Button>
    )
}