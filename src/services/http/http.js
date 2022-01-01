import axios from 'axios';

export const signUp = (data) => {
    console.log()
    return axios.post(`${process.env.REACT_APP_BACKEND}auth/register`, data);
}

export const signIn = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}auth/login`, data);
}