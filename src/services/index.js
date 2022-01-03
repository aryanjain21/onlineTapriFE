import axios from 'axios';

export const signUp = (data) => {
    console.log()
    return axios.post(`${process.env.REACT_APP_BACKEND}auth/register`, data);
}

export const signIn = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}auth/login`, data);
}

export const chat = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}tapri`, data);
}

export const createMeeting = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}api/create_meeting`, data);
}