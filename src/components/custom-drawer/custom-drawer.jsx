import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Chat from '../chat/chat';
import Participant from '../participant-list/participant-list';
import { Button } from '@mui/material';
import { useUser } from '../../context/userContext';
import { useMeeting } from '../../context/meetingContext';

const drawerWidth = 350;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function CustomDrawer(props) {

    const { askJoin, handleModalClose, handleAllowUser, allowUser, drawerOpen, setOpen, list, setList } = props;
    const { user } = useUser();
    const { meeting } = useMeeting();
    const theme = useTheme();

    const closeIconHandler = () => {
        if(drawerOpen) {
            setOpen(false)
        } else if(list) {
            setList(false)
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    height: "91.5vh",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        height: "91.5vh",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={drawerOpen || list}
            >
                <DrawerHeader>
                    <IconButton onClick={closeIconHandler}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <Box>{drawerOpen ? 'Send-In Message' : list ? 'Members' : ''}</Box>
                </DrawerHeader>
                <Divider />
                {drawerOpen ? <Chat /> : list ? <Participant /> : ''}
            </Drawer>
            {(meeting.meetingHost._id === user.userId) && <Modal
                open={askJoin}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography sx={{ marginBottom: "16px", fontSize: "16px" }} id="modal-modal-title" variant="h6" component="h6">
                        {allowUser.message}
                    </Typography>
                    <Box sx={{ width: "170px", float: "right", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Button variant="outlined" color="error" onClick={handleModalClose}>Denay</Button>
                        <Button variant='contained' onClick={handleAllowUser}>Admit</Button>
                    </Box>
                </Box>
            </Modal>}
        </Box>
    );
}
