import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { useMediaQuery, Typography, TextField, InputAdornment, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import { useEffect, useState } from 'react';

export default function ViewUsers() {
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`https://localhost:8080/api/users`);
      const data = await res.json();

      // Map the fetched data to create a new array with 'id' property
      const formattedData = data.map((item) => ({ id: item._id, ...item }));

      // Filter data based on the selected user type and search text
      const filteredUsers = formattedData.filter(
        (user) =>
          (!selectedUserType || user.user_type?.name === selectedUserType) &&
          (user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase()))
      );

      setFilteredData(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch user types from backend
    const fetchUserTypes = async () => {
      try {
        const res = await fetch(`https://localhost:8080/api/user_types`);
        const data = await res.json();
        setUserTypes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserTypes();
    fetchData();
  }, [selectedUserType, searchText]);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const columns = [
    { field: 'name', headerName: 'User Name', width: 200 },
    { field: 'email', headerName: 'User Email', width: 400 },
    {
      field: 'user_type.name',
      headerName: 'User Type',
      width: 200,
      valueGetter: (params) => params.row.user_type?.name || ''
    },
    {
      field: 'edit',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: () => (
        <>
          <ModeIcon style={{ color: 'black' }} />
          <DeleteIcon style={{ color: 'black', margin: 20 }} />
        </>
      )
    }
  ];

  return (
    <>
      <MainCard title="View Users">
        <Grid container direction="column" justifyContent="center">
          <Grid container sx={{ p: 3 }} spacing={matchDownSM ? 0 : 2}>
            {/* Search Textfield */}
            <Grid item xs={8} sm={5}>
              <Typography variant="h5" component="h5">
                Search
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="search"
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                SelectProps={{ native: true }}
                sx={{ ...theme.typography.customInput }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* User Type Select */}
            <Grid item xs={8} sm={3}>
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
            {/* DataGrid */}
            <Grid item xs={12} sm={12}>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={filteredData} columns={columns} pageSizeOptions={[5, 10]} checkboxSelection />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}
