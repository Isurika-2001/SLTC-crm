import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import { useEffect, useState } from 'react';

export default function UserForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch(`https://localhost:8080/api/user_types`);
      const data = await res.json();
      setUserTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected User Type:', selectedUserType);

    // Gather form data
    const formData = {
      name: e.target.name.value,
      password: e.target.password.value,
      email: e.target.email.value,
      user_type: selectedUserType
    };

    try {
      // Perform the form submission logic, e.g., send data to the server
      const res = await fetch('https://localhost:8080/api/users/add-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Handle the server response if needed
      console.log('Server response:', await res.json());
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <MainCard title="Add New User">
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" justifyContent="center">
            <Grid container sx={{ p: 3 }} spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Name
                </Typography>
                <TextField
                  fullWidth
                  // label="First Name"
                  margin="normal"
                  name="name"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  // label="First Name"
                  margin="normal"
                  name="password"
                  type="password"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  // label="First Name"
                  margin="normal"
                  name="email"
                  type="email"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h5">
                  User Type
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  name="userType"
                  select
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value)}
                  sx={{ ...theme.typography.customInput }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MergeTypeIcon />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value="">Select User Type</MenuItem>
                  {userTypes.map((userType) => (
                    <MenuItem key={userType._id} value={userType.name}>
                      {userType.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Divider />
            </Grid>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" type="submit">
                Add User
              </Button>
            </CardActions>
          </Grid>
        </form>
      </MainCard>
    </>
  );
}
