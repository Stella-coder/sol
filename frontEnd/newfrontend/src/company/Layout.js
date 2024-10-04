import React, { useState } from 'react';
import { Box, IconButton, Drawer, ListItem, ListItemText, Divider, List, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from "../assets/logo-no-background.png";

const Sidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: { xs: '200px', sm: '200px' },  // Adjust width for mobile and larger screens
        padding: '20px',
        bgcolor: '#2E6B62',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <img src={logo} alt="Logo" width="100px" height="50px" />
      </Box>
      <List sx={{ color: 'white' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <ListItem button sx={{ cursor: 'pointer', padding: '12px 16px' }}>
            <ListItemText primary="Overview" sx={{ color: 'white' }} />
          </ListItem>
        </Link>
        <Divider sx={{ bgcolor: 'white' }} />
        <Link to="/myproducts" style={{ textDecoration: 'none' }}>
          <ListItem button sx={{ cursor: 'pointer', padding: '12px 16px' }}>
            <ListItemText primary="Products" sx={{ color: 'white' }} />
          </ListItem>
        </Link>
        <Link to="/addproduct" style={{ textDecoration: 'none' }}>
          <ListItem button sx={{ cursor: 'pointer', padding: '12px 16px' }}>
            <ListItemText primary="Add Products" sx={{ color: 'white' }} />
          </ListItem>
        </Link>
        <Link to="/transaction" style={{ textDecoration: 'none' }}>
          <ListItem button sx={{ cursor: 'pointer', padding: '12px 16px' }}>
            <ListItemText primary="Transactions" sx={{ color: 'white' }} />
          </ListItem>
        </Link>
        <Divider sx={{ bgcolor: 'white' }} />
        <ListItem button sx={{ cursor: 'pointer', padding: '12px 16px' }}>
          <ListItemText primary="Logout" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Icon Button for Mobile Drawer */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' }, // Show only on mobile
          position: 'fixed',
          top: 8,
          left: 16,
          zIndex: 1300, // Ensure it's above other elements
        }}
      >
        <MenuIcon sx={{ color: 'darkgreen', fontSize: 32 }} />
      </IconButton>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {sidebarContent}
      </Drawer>

      {/* Static sidebar for larger screens */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' }, // Show only on larger screens
          width: '250px',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          bgcolor: '#2E6B62',
        }}
      >
        {sidebarContent}
      </Box>
    </>
  );
};

const LayoutWithSidebar = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ marginLeft: { xs: 0, md: '250px' }, width: '100%' }}>
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            bgcolor: '#ffffff',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 999,
          }}
        >
          <Box sx={{ marginRight: 3 }}>
            <Link to="/about" style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold' }}>
              About Us
            </Link>
          </Box>
          <Box sx={{ marginRight: 3 }}>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold' }}>
              Contact Us
            </Link>
          </Box>
          <Box>
            <Link to="/support" style={{ textDecoration: 'none', color: 'darkgreen', fontWeight: 'bold' }}>
              Support
            </Link>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ padding: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutWithSidebar;
