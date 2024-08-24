import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ِAdmin Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/admin/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/admin/add-quiz">
          Add Quiz
        </Button>
        <Button color="inherit" component={Link} to="/admin/create-instructor">
          Create Instructor
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
