import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { useMediaQuery,Typography, TextField, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function ViewCourses() {


    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const columns = [
        { field: 'name', headerName: 'Course Name', width: 200, },

        { field: 'description', headerName: 'Course Description', width: 1200 },
        {
            field: 'edit',
            headerName: '',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 200,
            renderCell: () => (
                <>
                    <ModeIcon style={{ color: "black" }} />
                    <DeleteIcon style={{ color: "black", margin: 20 }} />
                </>
            ),
        },

    ];

    const rows = [
        { id: 1, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 2, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 3, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 4, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 5, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 6, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 7, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 8, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
        { id: 9, name: 'John', description: 'Computer Science is the study of computers and computational systems. It involves understanding the theory, development, and application of software and systems, as well as the algorithms that enable them to function. Computer scientists explore various aspects of computing, ranging from hardware and software design to artificial intelligence and data analysis.' },
    ];

    return (
        <>
            <MainCard title="View Courses">
                <Grid container direction="column" justifyContent="center" >

                    <Grid container sx={{ p: 3 }}
                        spacing={matchDownSM ? 0 : 2}
                    >

                        <Grid item xs={8} sm={5} >
                            <Typography variant="h5" component="h5">
                                Search
                            </Typography>
                            <TextField
                                fullWidth
                                // label="First Name"
                                margin="normal"
                                name="course"
                                type="text"
                                SelectProps={{ native: true }}
                                defaultValue=""
                                sx={{ ...theme.typography.customInput }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </div>
                        </Grid>


                    </Grid>

                </Grid>
            </MainCard>


        </>
    );
}