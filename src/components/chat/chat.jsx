import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useUser } from '../../context/userContext';
import { useSocket } from '../../context/socketContext';
import { useMeeting } from '../../context/meetingContext';

const Chat = () => {

    const { socket, setSocket } = useSocket();
    const { user } = useUser();
    const { meeting, dispatchMeeting } = useMeeting();
    const [inpurtData, setInpurtData] = useState('');

    useEffect(() => {
        socket.on('message', (data) => {
            dispatchMeeting({ type: "SET_MSG", payload: data.data })
        })
        // eslint-disable-next-line
    }, [setSocket])

    const sendData = () => {
        if (inpurtData.trim() !== '') {
            socket.emit('send message', { "room_id": meeting.roomId, "message": inpurtData, name: user.firstName + ' ' + user.lastName }, (data) => {
                setInpurtData('');
            })
        }
    }

    const onKeyPressHandle = (e) => {
        if (e.which === 13) {
            sendData();
        }
    }

    return (
        <Box sx={{ width: "240px", padding: "16px 24px", position: "relative" }}>
            <Box mb={6}>
                <Box sx={{ margin: "0", fontSize: "14px", overflowY: "auto" }}>
                    {meeting.chat.map((data, index) => {
                        return <React.Fragment key={index}>
                            <Box component="span" sx={{ fontSize: "12px", fontWeight: "700" }}>
                                {data.sent_by}
                            </Box>
                            <Box component="div">{data.message}</Box>
                        </React.Fragment>

                    })}
                </Box>
            </Box>
            <Box sx={{ position: "fixed", bottom: "48px" }}>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={1}
                    value={inpurtData}
                    onKeyPress={(e) => onKeyPressHandle(e)}
                    onChange={(e) => setInpurtData(e?.target?.value)}
                    placeholder="send message..."
                    style={{ width: "300px", position: "relative", resize: "none", padding: "10px 32px 10px 20px", borderRadius: "20px" }}
                />
                <SendIcon onClick={sendData} style={{ position: "absolute", top: "5px", bottom: "0", right: "32px" }} />
            </Box>
        </Box>
    );
}

export default Chat;