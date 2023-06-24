import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8800/api';
const data = JSON.parse(localStorage.getItem("persist:root"));
const TOKEN = data !== null && JSON.parse(data?.user)?.currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : `Bearer ${TOKEN}`}
})