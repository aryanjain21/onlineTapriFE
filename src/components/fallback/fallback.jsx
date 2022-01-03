import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Fallback = (props) => {

    let navigate = useNavigate();
    return (
        <Box sx={{ width: "100%", padding: "16px 48px", textAlign: "center" }}>
            <Box component="h1" sx={{marginBottom: "16px"}}>
                Check your meeting code
            </Box>
            <Box component="span">
                Make sure you entered the correct meeting code in the URL, for example: <br />
                https://localhost:3000/tapri/<strong>xxxxxx</strong>
            </Box>
            <Box sx={{marginTop: "24px"}}>
                <Button variant='contained' onClick={() => navigate('/home')}>
                    Return to home screen
                </Button>
            </Box>
        </Box>
    );
}

export default Fallback;