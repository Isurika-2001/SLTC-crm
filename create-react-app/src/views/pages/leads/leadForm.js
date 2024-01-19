import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BroadcastOnPersonalIcon from '@mui/icons-material/BroadcastOnPersonal';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

export default function LeadForm() {


    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const [branches, setBranches] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [statusForm, setStatusForm] = useState();
    const [lable, setLable] = useState(false);
    // const [changedFields, setChangedFields] = useState({});


    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    // function formatDate(inputDate) {
    //     const date = new Date(inputDate);
    //     const month = String(date.getMonth() + 1).padStart(2, "0");
    //     const day = String(date.getDate()).padStart(2, "0");
    //     const year = date.getFullYear();
    //     const formattedD = `${year}-${month}-${day}`;
    //     return formattedD;
    // }

    const [values, setValues] = useState({
        name: "",
        dob: "",
        email: "",
        contact_no: "",
        address: "",
        date: formattedDate,
        scheduled_to: "",
        course: "Computer Science",
        branch: "Colombo",
        status: "Registered",
        comment: "",
        // updateDate: formattedDate,
        followupId: "",
    });

    useEffect(() => {

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
        const fetchBranches = async () => {
            try {
                const response = await fetch("https://localhost:8080/api/branches");
                if (response.ok) {
                    const json = await response.json();
                    setBranches(json);
                } else {
                    console.error("Error fetching branches:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching branches:", error.message);
            }
        };
        const fetchStatuses = async () => {
            try {
                const response = await fetch("https://localhost:8080/api/status");
                if (response.ok) {
                    const json = await response.json();
                    setStatuses(json);
                } else {
                    console.error("Error fetching  status:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching status:", error.message);
            }
        };
        fetchCourses();
        fetchBranches();
        fetchStatuses();

    }, [])

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            // setChangedFields((prevChangedFields) => ({
            //     ...prevChangedFields,
            //     [name]: value,
            // }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            try {

                //check duplicate lead
                const chceckDuplicate = await fetch(
                    `https://localhost:8080/api/checkLead?courseName=${values.course}&branchName=${values.branch}&studentName=${values.name}&contactNo=${values.contact_no}`
                );
                if (!chceckDuplicate.ok) {
                    console.error("Error checking duplicates", studentResponse.statusText);
                    return;
                }

                const duplicateLead = await chceckDuplicate.json();
                setLable(duplicateLead.isDuplicate);

                console.log("check", duplicateLead.isDuplicate);

                if (duplicateLead.isDuplicate == false) {
                    //insert student data
                    const studentResponse = await fetch("https://localhost:8080/api/students", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: values.name,
                            dob: values.dob,
                            contact_no: values.contact_no,
                            email: values.email,
                            address: values.address,
                        }),
                    });
                    if (!studentResponse.ok) {
                        console.error(
                            "Error inserting data to the student table",
                            studentResponse.statusText
                        );
                        return;
                    }
                    const studentData = await studentResponse.json();
                    const { _id: student_id } = studentData;
                    console.log("Student ID:", student_id);

                    //insert lead data
                    const leadResponse = await fetch("https://localhost:8080/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            date: values.date,
                            sheduled_to: values.scheduled_to,
                            course_name: values.course,
                            branch_name: values.branch,
                            student_id: student_id,
                            user_id: '657c3e31fd3c1e4d1c4c8ed1',
                        }),
                    });
                    if (!leadResponse.ok) {
                        console.error("Error inserting data to the lead table", leadResponse.statusText);
                        return;
                    }
                    const LeadData = await leadResponse.json();
                    const { _id: lead_id } = LeadData;
                    console.log("Lead ID:", lead_id);
                    //insert followup
                    const followUpResponse = await fetch("https://localhost:8080/api/followUps", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            lead_id: lead_id,
                            user_id: '657c3e31fd3c1e4d1c4c8ed1',
                            status: "New",
                            comment: values.comment,
                        }),
                    });
                    if (!followUpResponse.ok) {
                        console.error("Error inserting followup data", followUpResponse.statusText);
                        return;
                    }
                    console.log("Data inserted successfully!");
                    // setChangedFields({});
                    setValues({
                        name: "",
                        dob: "",
                        email: "",
                        contact_no: "",
                        address: "",
                        date: formattedDate,
                        scheduled_to: "",
                        course: "Computer Science",
                        branch: "Colombo",
                        status: "Registered",
                        comment: "",
                        updateDate: formattedDate,
                        followupId: "",
                    });
                } else {
                    console.log("Duplicate Lead");
                }
            } catch (error) {
                console.error("Error during data insertion:", error.message);
            }
        },
        [values]
    );

    return (
        <>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <MainCard title="Add New Lead">
                    <Grid container direction="column" justifyContent="center" >

                        <Grid container sx={{ p: 3 }}
                            spacing={matchDownSM ? 0 : 2}
                        >
                            <Grid item xs={12} sm={6} >
                                <Typography variant="h5" component="h5">
                                    Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h5">
                                    Dtae of birth
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="dob"
                                    type="date"
                                    onChange={handleChange}
                                    value={values.dob}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
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
                                    onChange={handleChange}
                                    value={values.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h5">
                                    Contact Number
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="contact_no"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.contact_no}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CallIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Typography variant="h5" component="h5">
                                    Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="address"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.address}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h5">
                                    Date
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="date"
                                    type="text"
                                    disabled
                                    onChange={handleChange}
                                    value={values.date}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h5">
                                    Scheduled To
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="scheduled_to"
                                    type="date"
                                    onChange={handleChange}
                                    value={values.scheduled_to}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventAvailableIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h5">
                                    Select Course
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="course"
                                    select
                                    onChange={handleChange}
                                    SelectProps={{ native: true }}
                                    value={values.course}
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
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h5">
                                    Select Branch
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="First Name"
                                    margin="normal"
                                    name="branch"
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.branch}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BroadcastOnPersonalIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {branches && branches.length > 0 ? (
                                        branches.map((option) => (

                                            <option key={option._id} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No Branches available
                                        </option>
                                    )}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Typography variant="subtitle1" gutterBottom style={{ color: "red" }}>
                                    {lable == true ? "Already added this lead." : ""}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
                                    <Button style={{ borderColor: 'gray' }}
                                        onClick={() => {
                                            setStatusForm(true);
                                        }}
                                        variant="outlined"
                                    >
                                        <AddIcon style={{ color: 'black' }} />
                                    </Button>
                                </Box>
                            </Grid>

                            {statusForm == true ? (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h5" component="h5">
                                            Select Status
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            // label="First Name"
                                            margin="normal"
                                            name="status"
                                            select
                                            value={values.status}
                                            SelectProps={{ native: true }}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HourglassTopIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {statuses && statuses.length > 0 ? (
                                                statuses.map((option) => (

                                                    <option key={option._id} value={option.name}>
                                                        {option.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>
                                                    No Status available
                                                </option>
                                            )}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h5" component="h5">
                                            Comment
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            // label="First Name"
                                            margin="normal"
                                            name="comment"
                                            type="text"
                                            value={values.comment}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ChatBubbleIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </>
                            ) : (<></>)}

                            <Divider />
                        </Grid>
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            <Button variant="contained" type="submit" >
                                Add Lead
                            </Button>
                        </CardActions>
                    </Grid>
                </MainCard>
            </form>
        </>
    );
}