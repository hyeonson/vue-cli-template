import router from "../router";

export const Mutations = {

  loginSuccess(state, payload) {
    state.userinfo = payload.userinfo;
    state.userinfo.errMsg = null;
    router.push('/');
  },
  goLoginSuccess(state) {
    state.userinfo =  {
      authId: "guest",
      authName: "guest",
      authAdmin: 0,
      partnerIdx: 0,
      errMsg: null
    }
    router.push('/login');
  },
  loginFail(state) {
    state.userinfo.errMsg = "이메일, 비밀번호가 일치하지 않습니다";
    //this.$set(state.userinfo, 'errMsg', '이메일, 비밀번호가 일치하지 않습니다')
  },
  logoutSuccess(state) {
    state.userinfo =  {
      authId: "guest",
      authName: "guest",
      authAdmin: 0,
      partnerIdx: 0,
      errMsg: null
    }
    router.push('/login');
  },
  authFail(state) {
    state.userinfo = {
      authId: "guest",
      authName: "guest",
      authAdmin: 0,
      partnerIdx: 0,
      errMsg: "다시 로그인 해주세요"
    };
    location.reload("/login");
  },
  signUpResult(state, payload) {
    if(payload == 0){
      state.errMsg = null;
      alert('회원가입 완료! 로그인을 다시 해주세요.');
      location.reload('/login');
    }
    else{
      state.errMsg = '중복된 이메일 입니다.';
    }
  },
  setErrMsg(state, payload){
    state.errMsg = payload;
  },
  clearErrMsg(state, payload){
    state.errMsg = null;
  }
};
