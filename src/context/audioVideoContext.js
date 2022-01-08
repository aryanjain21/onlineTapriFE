import React, { useReducer, useContext, createContext } from 'react';

const videoAudioContext = createContext();
let userStream;

const getDevices = (userVideoRef) => {
    // Get Video Devices
    let filteredDevices;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        const filtered = devices.filter((device) => device.kind === 'videoinput');
        filteredDevices = filtered;
    });

    // const op = {
    //     video: {
    //       width: { min: 160, ideal: 640, max: 1280 },
    //       height: { min: 120, ideal: 360, max: 720 }
    //     },
    //     audio: true
    //   };

    // Connect Camera & Mic
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            userStream = stream;
            userVideoRef.current.srcObject = stream;

        });
    return filteredDevices;
}

//Toggle Video
const toggleVideo = (isVideo) => {
    let video;
    const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
    if (!isVideo) {
        videoTrack.enabled = true;
        video = true;
    } else {
        videoTrack.enabled = false;
        video = false;
    }
    return video
};

//Toggle mic
const toggleAudio = (isAudio) => {
    let audio;
    const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
    if (isAudio) {
        audioTrack.enabled = false;
        audio = false;
    } else {
        audioTrack.enabled = true;
        audio = true;
    }
    return audio;
};



const deviceReducer = (state, action) => {
    switch (action.type) {
        case 'CONNECT_AUD_VID':
            let filteredDevices = getDevices(action.payload);
            return {
                ...state,
                videoDevices: filteredDevices
            };
        case 'VIDEO_STATE':
            let videoState = toggleVideo(state.userVideoAudio.video);
            return {
                ...state,
                userVideoAudio: { video: videoState, audio: state.userVideoAudio.audio }
            };
        case 'AUDIO_STATE':
            let audioState = toggleAudio(state.userVideoAudio.audio)
            return {
                ...state,
                userVideoAudio: { video: state.userVideoAudio.video, audio: audioState }
            };
        default:
            return state
    }
}

let initialState = {
    peers: [],
    userVideoAudio: { video: true, audio: true },
    videoDevices: [],
    displayChat: false,
    showVideoDevices: false,
    userId: ''
}

export const VideoAudioProvider = ({ children }) => {

    // const [peers, setPeers] = useState([]);
    // const [userVideoAudio, setUserVideoAudio] = useState({
    //     localUser: { video: true, audio: true },
    // });
    // const [videoDevices, setVideoDevices] = useState([]);
    // const [displayChat, setDisplayChat] = useState(false);
    // const [screenShare, setScreenShare] = useState(false);
    // const [showVideoDevices, setShowVideoDevices] = useState(false);
    // const peersRef = useRef([]);    //Other user video

    // const screenTrackRef = useRef();

    const [audioVideoState, audioVideoDispatch] = useReducer(deviceReducer, initialState);


    return (
        <>
            <videoAudioContext.Provider value={{ toggleVideo, toggleAudio, audioVideoState: audioVideoState, audioVideoDispatch: audioVideoDispatch }}>
                {children}
            </videoAudioContext.Provider>
        </>
    )
}

export const useAudioVideo = () => {
    return useContext(videoAudioContext)
}