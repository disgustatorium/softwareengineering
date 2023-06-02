import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { userToken } from "../root";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

export default function JoinGroup() {
    const [name, setName] = useState();
    const [text, setText] = useState();

    function newGroup() {
        if (!name.target.value) {
            alert("Please ensure all fields are filled.");
            return;
        }
        let requestJson = { "token": userToken, "groupID": name.target.value };
        fetch('http://localhost:3001/joinGroup', { method: 'POST', body: JSON.stringify(requestJson), headers: { 'Content-type': 'application/json; charset=UTF-8' }, }).then((response) => response.json()).then((data) => {
            if (data.success) window.location.href = "../groups";
            else setText(data.reason);
        }).catch((err) => { console.log(err.message); });
    }

    return (
        <Container sx={
            { padding: "30px", marginBottom: "76px" }
        } maxWidth="sm">
            <Item>
                <Typography variant="h2" component="h1" gutterBottom> Join Group </Typography>
                <Grid container direction="column" rowGap={2} maxWidth="sm">
                    <TextField
                        label="Group Join ID"
                        variant="outlined"
                        onChange={(newValue) => setName(newValue)}
                    />
                    {text}
                    <Button variant="contained" onClick={newGroup} endIcon={<AddCircleIcon />}> Join </Button>
                </Grid>
            </Item>

        </Container>
    );
}
