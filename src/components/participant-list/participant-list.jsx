import { Box } from '@mui/material';
import React from 'react';
import { useMeeting } from '../../context/meetingContext';

const Participant = () => {

    const { meeting } = useMeeting();
    console.log(meeting.participant)

    return (
        meeting.participant.map((list, index) => (
            <Box key={index} sx={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {list.user_id.firstName + ' ' + list.user_id.lastName} {list.host && <Box component="span" sx={{ fontSize: "12px", color: "green"}}>host</Box>}
            </Box>
        ))
    );
}

export default Participant;