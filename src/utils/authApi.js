import api from "./api";

export const getUsername = ()=>api.get('/api/auth/check').then(data=>data);

export const login = (object)=>api.post('/login', new URLSearchParams(object));

export const logout = ()=>api.post('/logout');

export const isCheckPassword = ()=>api.get('/api/auth/check-password').then(data=>data);