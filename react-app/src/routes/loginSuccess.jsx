import theme from '../theme';
import '../Landing.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

import { Typography, Button, ThemeProvider, Box } from '@mui/material';


export default function LoginSuccess() {

  return (
    <ThemeProvider theme={theme}>
      <div>
      log in successfull yay
      </div>
    </ThemeProvider>
  );

}
