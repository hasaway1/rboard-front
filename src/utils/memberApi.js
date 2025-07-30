import api from "./api";

export const idAvailable = (username)=>api.get(`/api/members/check-username?username=${username}`).then(data=>data);;

export const signup = (formData)=>api.post('/api/members/new', formData);

export const verifyCode = (code)=>api.put(`/api/members/verify?code=${code}`)

export const findUsername = (email)=>api.get(`/api/members/username?email=${email}`).then(data=>data);;

export const checkPassword = (password)=>api.get(`/api/members/check-password?password=${password}`).then(data=>data);;

export const resetPassword = (username)=>api.put(`/api/members/password?username=${username}`);

export const read = ()=>api.get('/api/members/member').then(res => res.data).then(data=>data);;

export const changeProfile = (formData)=>api.put('/api/members/profile', formData)

export const changePassword = (object)=>api.patch('/api/members/password', new URLSearchParams(object));

export const resign = ()=>api.delete('/api/members/member');