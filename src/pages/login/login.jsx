import { Box, Grid, styled } from '@mui/material';
import React from 'react';
import { makeStyles } from "@mui/styles";
import HeroBanner from '../../components/hero-banner/hero-banner';
import LoginForm from '../../components/login-form/login-form';

const useStyles = makeStyles((theme) => ({
    loginSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            display: "block",
        }
    }
}));

const Login = (props) => {

    const classes = useStyles();
    // const Item = styled(Paper)(({ theme }) => ({
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    return (
        <Box sx={{ flexGrow: 1, height: "80vh" }} pt={4}>
            <Grid container justifyContent="center" alignItems="center" flex={1} spacing={{xs: 0, md: 2}}>
                <Grid item xs={12} sm={6}>
                    <HeroBanner login />
                </Grid>
                <Grid className={classes.loginSection} item xs={12} sm={6}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;