import React from 'react';

const ParticipantVideo =({participantVideoRef}) => {
    return(
        <video styles={{display: "block"}} heigth="300" id="participantvideo" autoPlay playsInline ref={participantVideoRef} />
    );
}

export default ParticipantVideo;