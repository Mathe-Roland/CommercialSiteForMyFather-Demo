import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'background.paper',
        py: 3,
        textAlign: 'center'
      }}
    >
      <Container>
        <Typography variant="h6" gutterBottom>
          Monstrik Dreamland
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'© '}
          <Link color="inherit" href="https://decorcut.com">
            decorcut.com
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Link color="inherit" href="/">
            Home
          </Link>{' | '}
          <Link color="inherit" href="/despre-noi">
            About
          </Link>{' | '}
          <Link color="inherit" href="/contact">
            Contact
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
