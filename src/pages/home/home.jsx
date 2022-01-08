import { Box, Grid } from '@mui/material';
import React from 'react';
import HeroBanner from '../../components/hero-banner/hero-banner';
import NewMeet from '../../components/new-meet/new-meet';

const Home = (props) => {

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, height: "90vh" }} pt={4}>
            <Grid container justifyContent="center" alignItems="center" flex={1} spacing={{ xs: 0, md: 2 }}>
                <Grid item xs={12} sm={7} md={5}>
                    <NewMeet />
                </Grid>
                <Grid item xs={12} sm={5} md={7}>
                    <HeroBanner meet />
                    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: {xs: "24px", sm: "0"} }}>
                        <Box sx={{ width: "300px", textAlign: "center" }}>
                            <Box component="h3">
                                Get a link you can share
                            </Box>
                            <Box component="span" sx={{ fontSize: "14px" }}>
                                Click <strong>New Meeting</strong> to get a link you can send to people you want to meet w
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;