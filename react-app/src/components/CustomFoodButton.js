import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CustomFoodButton() {
    return (
        <Button variant="contained" component={Link} to="customFood" endIcon={<RamenDiningIcon />}>CUSTOM FOOD</Button>
    )
}