import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme'
import { Link } from "react-router-dom";

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ pb: 0 }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
                    <BottomNavigation value={value} onChange={handleChange}>
                    
                        <BottomNavigationAction component={Link} to="dashboard" label="Dashboard" value="dashboard" icon={<DashboardIcon />} />                        {/* </Link> */}
                        <BottomNavigationAction component={Link} to="goals" label="Goals" value="goals" icon={<EmojiEventsIcon />} />
                        <BottomNavigationAction component={Link} to="tracking" label="Tracking" value="tracking" icon={<AddCircleIcon />} />
                        <BottomNavigationAction component={Link} to="groups" label="Groups" value="groups" icon={<GroupsIcon />} />
                        <BottomNavigationAction component={Link} to="appSettings" label="Settings" value="appSettings" icon={<SettingsIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
