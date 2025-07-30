import api from "./api";


export const readAll = (pageno)=>api.get(`/api/posts?pageno=${pageno}`).then(res => res.data).then(data=>data);;

export const read = (pno)=>api.get(`/api/posts/post?pno=${pno}`).then(res => res.data).then(data=>data);;

export const add = (object)=>api.post('/api/posts/new', new URLSearchParams(object));

export const update = (object)=>api.put('/api/posts/post', new URLSearchParams(object));

export const erase = (pno)=>api.delete(`/api/posts/post?pno=${pno}`);

export const good = (pno)=>api.put(`/api/posts/good?pno=${pno}`);
