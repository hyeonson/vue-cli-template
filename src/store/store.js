import Vue from "vue";
import Vuex from "vuex";
import { userInfoGetters } from "./getters.js";
import { Mutations } from "./mutations.js";
import { Actions } from "./actions.js";
import * as Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userinfo: {
      authId: "guest",
      authName: "guest",
      authAdmin: 0,
      partnerIdx: 0,
      errMsg: null
    },
    errMsg: null
  },
  mutations: Object.assign({}, Mutations),
  getters: Object.assign({}, userInfoGetters),
  actions: Object.assign({}, Actions),
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
});
