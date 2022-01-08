import { Box, Grid } from '@mui/material';
import React from 'react';
import { makeStyles } from "@mui/styles";
import HeroBanner from '../../components/hero-banner/hero-banner';
import SignUpForm from '../../components/signup-form/signup-form';

const useStyles = makeStyles((theme) => ({
    signUpSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            display: "block",
        }
    }
}));

const SignUp = (props) => {

    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1, height: "80vh" }} pt={4}>
            <Grid container justifyContent="center" alignItems="center" flex={1} spacing={{ xs: 0, md: 2 }}>
                <Grid item xs={12} sm={6}>
                    <HeroBanner login={false} />
                </Grid>
                <Grid className={classes.signUpSection} item xs={12} sm={6}>
                    <SignUpForm />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SignUp;