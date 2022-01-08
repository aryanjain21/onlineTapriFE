import React, { useContext, createContext, useReducer } from 'react';

const MeetingContext = createContext();

const meetingReducer = (state, action) => {
    switch (action.type) {
        case 'JOIN_MEET':
            return {
                ...state,
                participant: action.payload
            };
        case 'SET_MEET_INFO':
            return {
                ...state,
                participant:  action.payload.participants,
                meetingHost: action.payload.user_id,
                roomId: action.payload.room,
                meetingId: action.payload.meeting_id
            };
        case 'SET_MSG':
            return{
                ...state,
                chat: [...state.chat, action.payload]
            }
        default:
            return state
    }
}

let initialState = {
    chat: [],
    roomId: '',
    meetingId: '',
    meetingHost: {},
    participant: [],
}

export const MeetingProvider = ({ children }) => {

    const [meeting, dispatchMeeting] = useReducer(meetingReducer, initialState);

    return (
        <>
            <MeetingContext.Provider value={{ meeting, dispatchMeeting }}>
                {children}
            </MeetingContext.Provider>
        </>
    )
}

export const useMeeting = () => {
    return useContext(MeetingContext)
}