import { Box } from '@mui/material';
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';

const BottomBar = () => {

    const [date, setDate] = useState(new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(Date.now()));
    const [time, setTime] = useState(new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(Date.now()));

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {time} - {date}
            </Box>
            <Box>
                <Box>
                    <MicIcon />
                </Box>
                <Box>
                    <VideocamIcon />
                </Box>
                <Box>
                    <CallEndIcon sx={{ color: pink[500] }} />
                </Box>
            </Box>
            <Box>
                <Box>
                    <InfoIcon />
                </Box>
                <Box>
                    <GroupsIcon />
                </Box>
                <Box>
                    <ChatIcon />
                </Box>
            </Box>
        </Box>
    );
}

export default BottomBar;