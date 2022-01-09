import { useEffect, useRef, useState } from 'react';
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
import ParticipantVideo from '../participant-video/participant-video';

import { useSocket } from '../../context/socketContext';
import Peer from "simple-peer";


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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function CustomDrawer(props) {

    const [stream, setStream] = useState();
    const { socket } = useSocket()
    const partnerVideo = useRef();
    const [callAccepted, setCallAccepted] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();


    const { participantVideoRef, askJoin, handleModalClose, handleAllowUser, allowUser, drawerOpen, setOpen, list, setList } = props;
    const { user } = useUser();
    const { meeting } = useMeeting();
    const theme = useTheme();

    const closeIconHandler = () => {
        if (drawerOpen) {
            setOpen(false)
        } else if (list) {
            setList(false)
        }
    }

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {

            setStream(stream);
            if (participantVideoRef.current) {
                participantVideoRef.current.srcObject = stream;
            }
        })

        socket.on("hey", (data) => {
            console.log("data hey", data)
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })


// eslint-disable-next-line
    }, [])


    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            // config: {

            //     iceServers: [
            //         {
            //             urls: "stun:numb.viagenie.ca",
            //             username: "sultan1640@gmail.com",
            //             credential: "98376683"
            //         },
            //         {
            //             urls: "turn:numb.viagenie.ca",
            //             username: "sultan1640@gmail.com",
            //             credential: "98376683"
            //         }
            //     ]
            // },
            stream: stream,
        });

        peer.on("signal", data => {
            socket.emit("callUser", { userToCall: id, signalData: data, from: user.userId })
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }


    let UserVideo;
    if (stream) {
        UserVideo = (
            <ParticipantVideo playsInline muted participantVideoRef={participantVideoRef} autoPlay />
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <ParticipantVideo playsInline participantVideoRef={partnerVideo} autoPlay />
        );
    }

    let incomingCall;
    if (receivingCall) {
        console.log("abcccc")
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall} style={{ zIndex: 1000 }}>Accept Callllll</button>
            </div>
        )
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Main>
                {UserVideo}
                {PartnerVideo}
                <Box>
                    {
                        meeting.participant.map((part) => {
                            if (user.userId === part.user_id._id) {
                                return null;
                            }
                            return (
                                <button onClick={() => callPeer(part.socket_id)}>Call {part.socket_id}</button>
                            );

                        })
                    }
                    {incomingCall}
                </Box>
            </Main>
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
