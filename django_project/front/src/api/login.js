import axios from 'axios';

const endpoint = 'https://api.wowcube.xxiweb.ru/'

export const loginApi = data => axios.post(`${endpoint}api/auth/jwt/create`, data);