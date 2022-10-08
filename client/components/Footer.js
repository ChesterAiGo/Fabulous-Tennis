
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Fabuluous-Tennis.com
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}


const Footer = () => {

  return (

    <Box sx={{ bgcolor: 'background.paper', pt: 1 }} component="footer">
    <hr />
    <Typography variant="h6" align="center" gutterBottom>
      Contact @ freeaigo2012@gmail.com
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Thank you for visiting!
    </Typography>
    <Copyright />
    </Box>
  );
};

export default Footer;
