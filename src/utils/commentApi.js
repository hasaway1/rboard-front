import api from "./api";

// post, put, patch는 body를 사용하는 것이 일반적
// get, delete는 쿼리스트링을 사용한다

export const add = (object)=>api.post('/api/comments/new', new URLSearchParams(object));

export const erase = (cno, pno)=>api.delete(`/api/comments?cno=${cno}&pno=${pno}`);