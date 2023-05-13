import { ThemeProvider } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

export default function ProfileCircleButton() {
    return (
        <IconButton size="large" component={Link} to="userSettings" aria-label="userProfile"> <AccountCircleIcon /> </IconButton>
    )
}