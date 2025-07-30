export const AsyncStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
  SUBMITTING: 'submitting'
};

export const modules = {
  toolbar: {
    container: [['image'], [{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline']]
  }
};

export const convertToInt=(param, result)=>{
  const num = parseInt(param, 10);
  return (num >= 1) ? num : result;
}

export const Patterns = {
  username: {
    label: "아이디",
    emptyMessage : "아이디는 필수입력입니다",
    regexp: /^[0-9a-z]{6,10}$/,
    patternMessage: "아이디는 숫자와 소문자 6~10자입니다"
  },
  password: {
    label: "비밀번호",
    emptyMessage : "비밀번호는 필수입력입니다",
    regexp: /^[0-9A-Za-z]{6,10}$/,
    patternMessage: "비밀번호는 영숫자 6~10자입니다"
  },
  email: {
    label: "이메일",
    emptyMessage : "이메일는 필수입력입니다",
    regexp: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    patternMessage: "이메일을 올바르게 입력해주세요"
  }
}