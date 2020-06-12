import axios from "axios";
import router from "../router";

export const Actions = {
  postLogin({ commit }, payload) {
    axios
      .post(
        "/api/users/login", payload
      )
      .then(response => {
        console.log(response);
        if (response.data.status == 200) {
          commit("loginSuccess", {
            userinfo: response.data.data
          });
        } else {
          commit('loginFail')
          console.log("server error: " + response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  postLogout({ commit }) {
    axios
      .post(
        "/api/users/logout"
      )
      .then(response => {
        console.log(response);
        if (response.data.status == 200) {
          commit("logoutSuccess");
        } else {
          console.log("server error: " + response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  postSignUp({ commit }, payload) {
    axios
      .post(
        "/api/users", payload
      )
      .then(response => {
        console.log(response);
        if (response.data.status == 200) {
          console.log('response.data: ' + response.data);
          commit("signUpResult", 0);
        } else {
          commit("signUpResult", 1);
          console.log("server error: " + response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  goLogin({commit}){
    commit("goLoginSuccess");
  },
  setErrMsg({commit}, payload){
    commit('setErrMsg', payload);
  },
  clearErrMsg({commit}){
    commit('clearErrMsg');
  }
};
