import { ThemeProvider } from '@emotion/react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function JoinGroupButton() {
    return (
        <Button variant="contained" component={Link} to="joinGroup" endIcon={<AddCircleIcon />}>Join group</Button>
    )
}
