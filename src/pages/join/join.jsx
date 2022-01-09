import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../../context/userContext';
import { useAudioVideo } from '../../context/audioVideoContext';
import { useSocket } from '../../context/socketContext';
import { io } from "socket.io-client";
import { useNavigate, useParams } from 'react-router-dom';
import JoiningMeet from '../../components/joining-meet/joining-meet';
import Room from '../room/room';
import { useMeeting } from '../../context/meetingContext';

const Join = (props) => {

    const { socket, setSocket } = useSocket();
    const { meeting, dispatchMeeting } = useMeeting();
    const { audioVideoDispatch } = useAudioVideo();
    const { user } = useUser();
    const userVideoRef = useRef();  //My video
    const participantVideoRef = useRef();
    const navigate = useNavigate();
    const [joined, setJoined] = useState(false);
    const [meetingInfo, setMeetingInfo] = useState({});
    const [allowUser, setAllowUser] = useState({});
    const [askJoin, setAskJoin] = useState(false);
    let params = useParams();

    useEffect(() => {
        let newSocket = io('https://online-tapri.herokuapp.com/tapri');
        setSocket(newSocket);
        newSocket.emit('meeting info', { "meeting_id": params.meeting_id }, (data) => {
            if (data.statusCode === 200) {
                setMeetingInfo(data);
                dispatchMeeting({type: "SET_MEET_INFO", payload: data.data});
                audioVideoDispatch({ type: "CONNECT_AUD_VID", payload: userVideoRef })
            } else {
                navigate('/error');
            }
        })
        newSocket.on('list', (data) => {
            dispatchMeeting({type: "JOIN_MEET", payload: data.data})
        })
        newSocket.on('permission', (data) => {
            setAskJoin(true)
            setAllowUser(data);
        })
        newSocket.on('participant joined', () => {
            setJoined(true);
        })
        // eslint-disable-next-line
    }, [setSocket]);

    const handleModalClose = () => setAskJoin(false);

    const handleAllowUser = () => {
        socket.emit('participant join', { "room_id": allowUser.data.room_id, "meeting_info_id": meetingInfo.data._id, "socket_id": allowUser.data.socket_id, "user_id": allowUser.data.user_id }, (data) => {
            if (data.statusCode === 200) {
                setAskJoin(false);
            }
        })
    }

    const joinMeet = () => {
        if (user.userId === meetingInfo.data.user_id._id) {
            socket.emit('join meeting', { "room_id": meetingInfo.data.room, "meeting_info_id": meetingInfo.data._id, "user_id": user.userId }, (data) => {
                if (data.statusCode === 200) {
                    setJoined(true);
                }
            })
        } else {
            socket.emit('ask to join', { "room_id": meetingInfo.data.room, "socket_id": meeting.meetingHost.socket_id, "name": user.firstName + ' ' + user.lastName, "user_id": user.userId }, (data) => {

            })
        }
    }

    return (
        <Box sx={{}} pt={4}>
            {(meetingInfo?.statusCode === 200) && !joined && (<JoiningMeet userVideoRef={userVideoRef} meetingInfo={meetingInfo} joinMeet={joinMeet} />)}
            {joined && (<Room participantVideoRef={participantVideoRef} askJoin={askJoin} setAskJoin={setAskJoin} allowUser={allowUser} handleModalClose={handleModalClose} handleAllowUser={handleAllowUser} />)}
        </Box>
    );
}

export default Join;