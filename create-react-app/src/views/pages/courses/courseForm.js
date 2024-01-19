import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextareaAutosize from '@mui/material/TextareaAutosize';



export default function CourseForm() {


    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <>
            <MainCard title="Add New Course">
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
                                defaultValue=""
                                sx={{ ...theme.typography.customInput }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                        </Grid >
                        <Grid item xs={12} sm={12} >
                            <Typography variant="h5" component="h5">
                                Description
                            </Typography>
                            <TextareaAutosize minRows={8}
                                fullWidth
                                style={{ width: '100%' }} 
                                margin="normal"
                                name="description"
                                type="text"
                                defaultValue=""
                                sx={{ ...theme.typography.customInput }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        
                        <Divider />
                    </Grid>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button variant="contained" type="submit">
                            Add Course
                        </Button>
                    </CardActions>
                </Grid>
            </MainCard>


        </>
    );
}