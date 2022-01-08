import { Box } from '@mui/material';
import React, {useState} from 'react';
import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';

const BottomBar = (props) => {

    const {drawerOpen, setOpen, list, setList} = props;

    const [date, setDate] = useState(new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(Date.now()));
    const [time, setTime] = useState(new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(Date.now()));

    return (
        <Box sx={{ height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 32px", backgroundColor: "gray" }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {time} - {date}
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Box sx={{marginRight: "16px"}}>
                    <MicIcon />
                </Box>
                <Box sx={{marginRight: "16px"}}>
                    <VideocamIcon />
                </Box>
                <Box>
                    <CallEndIcon sx={{ color: "red" }} />
                </Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Box sx={{marginRight: "16px"}}>
                    <InfoIcon />
                </Box>
                <Box sx={{marginRight: "16px"}} onClick={() => setList(!list)}>
                    <GroupsIcon />
                </Box>
                <Box onClick={() => setOpen(!drawerOpen)}>
                    <ChatIcon />
                </Box>
            </Box>
        </Box>
    );
}

export default BottomBar;