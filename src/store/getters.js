export const userInfoGetters = {
  getUserInfo(state, getters) {
    return state.userinfo;
  },
  getErrMsg(state, getters){
    return state.errMsg;
  } 
};
