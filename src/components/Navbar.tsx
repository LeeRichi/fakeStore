import { AppBar, Toolbar, IconButton, Typography, Badge } from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom'; 

import logo from '../assets/rich-logo.png'



const Navbar = () =>
{
  return (
    <AppBar position="static" sx={{ height: 64 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Rich.io
          </Link>
        </Typography>
        <IconButton color="inherit" component={Link} to="/login" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <AccountCircle />
        </IconButton>
        <IconButton component={Link} to="/cart" color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <Badge color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
