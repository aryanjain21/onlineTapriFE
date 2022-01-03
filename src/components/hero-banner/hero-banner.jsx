import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Login from '../../assets/images/login.svg';
import SignUp from '../../assets/images/signup.svg';
import Meet from '../../assets/images/meet.svg';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});


const HeroBanner = (props) => {

    const { login, meet } = props;

    return (
        <Box sx={{ width: "100%", textAlign: { xs: "center" }, marginBottom: { xs: "2em", sm: "0" } }}>
            {meet ?
                <Box component="img" src={Meet} alt="meet banner" sx={{ width: { xs: "50%", sm: "40%" }, height: { xs: "50%", sm: "40%" } }} />
                :
                <Box component="img" src={login ? Login : SignUp} alt="banner" sx={{ width: { xs: "80%" }, height: { sm: "80vh" } }} />
            }
        </Box>
    );
}

export default HeroBanner;