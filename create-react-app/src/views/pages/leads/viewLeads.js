import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { InputAdornment, TextField, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TimelineIcon from '@mui/icons-material/Timeline';
import MonitorIcon from '@mui/icons-material/Monitor';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ViewLeads() {

    const navigate = useNavigate();
    // const { id } = useParams();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const iconComponentMap = {
        facebook: <FacebookIcon color="primary" style={{ color: "blue" }} />,
        manual: <MonitorIcon color="primary" style={{ color: "green" }} />,
        internal: <TimelineIcon color="primary" style={{ color: "orange" }} />,
    };
    const [courses, setCourses] = useState([]);

    // const top100Films = [

    //     { label: 'The Godfather', year: 1952 },
    //     { label: 'The Godfather', year: 1952 },
    //     { label: 'The Godfather', year: 1952 },
    //     { label: 'The Godfather', year: 1952 },
    //     { label: 'The Godfather', year: 1952 }

    // ];
    const [counselors, setCounselors] = useState([]);

    const columns = [
        { field: 'name', headerName: 'Student Name', width: 200, },
        { field: 'icon', headerName: 'Source', width: 150, renderCell: (params) => iconComponentMap[params.row.icon], },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'scheduled_to', headerName: 'Scheduled To', width: 200 },
        {
            field: 'course',
            headerName: 'Course',
            width: 250,
        },
        {
            field: 'branch',
            headerName: 'Branch',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
        },
        {
            field: 'counsellor',
            headerName: 'Assign To',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 300,
            renderCell: () => (
                <>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={counselors}
                        sx={{ width: 200, my: 2 }}
                        renderInput={(params) => <TextField {...params} label="Choose a counsellor" variant="standard" />}
                    />
                </>
            ),
        },
        {
            field: 'edit',
            headerName: '',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <>
                    <ModeIcon onClick={() => { updateLead(params.row.id) }} style={{ color: "black" }} />
                    <DeleteIcon style={{ color: "black", margin: 20 }} />
                </>
            ),
        },
    ];

    function updateLead(leadId) {
        console.log("clicked lead id", leadId);
        navigate('/leads/add?id=' + leadId);
    }

    // const rows = [
    //     { id: 1, icon: 'facebook', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 2, icon: 'manual', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 3, icon: 'internal', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 4, icon: 'facebook', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 5, icon: 'manual', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 6, icon: 'internal', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 7, icon: 'facebook', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 8, icon: 'manual', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    //     { id: 9, icon: 'internal', name: 'John', status: 'Snow', scheduled_to: '2023-12-22', course: 'Computer Science', branch: 'Colombo', counsellor: 'Doe' },
    // ];

    useEffect(() => {
        async function fetchLeads() {
            try {
                const res = await fetch("https://localhost:8080/api/leads-details");
                const data = await res.json();

                console.log(data);
                setData(data);
            } catch (error) {
                console.log("Error fetching courses:", error);
            }
        }
        fetchLeads();
        const fetchCourses = async () => {
            try {
                const response = await fetch("https://localhost:8080/api/courses");
                if (response.ok) {
                    const json = await response.json();
                    setCourses(json);
                } else {
                    console.error("Error fetching courses:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching courses:", error.message);
            }
        };
        fetchCourses();
        async function getCounselors() {
            try {
                const res = await fetch("https://localhost:8080/api/getCounsellors");
                const data = await res.json();

                console.log(data);
                setCounselors(data);
            } catch (error) {
                console.log("Error fetching counselors:", error);
            }
        }
        getCounselors();
    }, [])

    const [data, setData] = useState([]);

    return (
        <>

            <MainCard title="View Leads">
                <Grid container direction="column" justifyContent="center" >

                    <Grid container sx={{ p: 3 }}
                        spacing={matchDownSM ? 0 : 2}
                    >

                        <Grid container direction="column">
                            <Grid container sx={{ p: 3 }} spacing={matchDownSM ? 0 : 2}>
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid><Grid item xs={8} sm={5} ></Grid>
                                <Grid item xs={8} sm={3} >
                                    <Typography variant="h5" component="h5">
                                        Course
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        // label="First Name"
                                        margin="normal"
                                        name="course"
                                        select
                                        SelectProps={{ native: true }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AssignmentIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                        {courses && courses.length > 0 ? (
                                            courses.map((option) => (

                                                <option key={option._id} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>
                                                No Courses available
                                            </option>
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid item xs={8} sm={3} >
                                    <Typography variant="h5" component="h5">
                                        Media
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        // label="First Name"
                                        margin="normal"
                                        name="media"
                                        select
                                        SelectProps={{ native: true }}
                                        defaultValue=""
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <InsertLinkIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h5" component="h5">
                                        Date From
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        // label="First Name"
                                        margin="normal"
                                        name="date"
                                        type="date"
                                        defaultValue=""
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRangeIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h5" component="h5">
                                        Date To
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        // label="First Name"
                                        margin="normal"
                                        name="date"
                                        type="date"
                                        defaultValue=""
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRangeIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={data}
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