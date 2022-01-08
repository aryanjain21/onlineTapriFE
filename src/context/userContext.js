import React, { useReducer, useContext } from 'react';

const UserContext = React.createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                token: action.payload.token,
                userId: action.payload.id
            };
        case 'LOGOUT':
            return {
                firstName: '',
                lastName: '',
                email: '',
                token: ''
            };
        default:
            return state
    }
}

let initialState = {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    userId: ''
}

export const UserProvider = ({ children }) => {
    let user = JSON.parse(localStorage.getItem('setUser')) || { name: '', email: '', token: '' }
    if (user.token) {
        initialState.firstName = user.firstName
        initialState.lastName = user.lastName
        initialState.email = user.email
        initialState.token = user.token
        initialState.userId = user.id
    }

    const [userState, userDispatch] = useReducer(userReducer, initialState);

    return (
        <>
            <UserContext.Provider value={{ user: userState, userDispatch }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}