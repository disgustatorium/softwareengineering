import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export default function AppSettings() {

  return (
    <Container sx={
      { padding: "30px" }
    } maxWidth="sm">
      <Item>
        <Typography variant="h2" component="h1" gutterBottom>App settings</Typography>
        <Grid container direction="column" rowGap={2} maxWidth="sm">
        </Grid>
      </Item>
    </Container>
  )
}