import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8800/api';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGYzOGZjYzgyYzE3YTRhMDNiZDNmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzI4MDY3MCwiZXhwIjoxNjg3NTM5ODcwfQ.0x2TDB_W-FxJ7Z46My5T__JiYD1M4RrkUZQ4OStHdN8";

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header : {token : `Bearer ${TOKEN}`}
})