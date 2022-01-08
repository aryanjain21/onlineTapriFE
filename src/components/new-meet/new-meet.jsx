import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createMeeting } from '../../services';
import MeetLinkModal from './meet-link-modal';

const settings = ['Create a meeting for later', 'Start an instant meeting'];


const NewMeet = () => {

    const [open, setOpen] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [meetId, setMeetId] = useState('');

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        console.log(anchorElNav)
    };

    const handleMeet = async (option) => {
        if (option === 'Create a meeting for later') {
            let createMeet = await createMeeting();
            if (createMeet.data.statusCode === 200) {
                setMeetId(`https://online-tapri.netlify.app/tapri/${createMeet.data.data.meeting_id}`);
                setOpen(true);
            }
        } else {

        }
    }

    return (
        <Box sx={{ width: "100%", padding: { xs: "0", sm: "8px 16px", md: "16px 48px" }, textAlign: { xs: "center", sm: "left" }, marginBottom: { xs: "2em", sm: "0" } }}>
            <Box component="h1" sx={{ marginBottom: "24px" }}>
                Online video meetings.<br />Now free for everyone.
            </Box>
            <Box component="p" sx={{ marginBottom: { xs: "24px", sm: "54px" } }}>
                We re-engineered the service we built for secure business meetings, Google Meet, to make it free and available for all.
            </Box>
            <Box sx={{ flexGrow: 0, marginLeft: { xs: "auto", sm: "0" } }}>
                <Button
                    sx={{ padding: "11px 32px" }}
                    onClick={handleOpenUserMenu}
                    startIcon={<VideoCallIcon />}
                    variant="contained"
                >
                    New Meeting
                </Button>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" onClick={() => handleMeet(setting)}>{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            {open && <MeetLinkModal open={open} setOpen={setOpen} meetLink={meetId} />}
        </Box>
    );
}

export default NewMeet;