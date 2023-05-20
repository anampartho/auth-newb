import axios from 'axios';
import { LOGIN_URL, SIGNUP_URL, VALIDATE_USER_URL } from '@/config/api-urls';

const authModule = {
  namespaced: true,
  state() {
    return {
      user: null,
      errorMessage: '',
      loggedIn: false
    };
  },
  mutations: {
    updateUser(state, payload) {
      state.user = { ...payload };
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
    },
    setLoggedIn(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    async signUp({ commit }, payload) {
      try {
        const data = await axios.post(SIGNUP_URL, payload);
        commit('updateUser', data.data);
        commit('setErrorMessage', '');
      } catch (error) {
        commit('setErrorMessage', error.response.data.message || error.message);
      }
    },
    async signIn({ commit }, payload) {
      try {
        const data = await axios.post(LOGIN_URL, payload);
        commit('updateUser', data.data);
        commit('setErrorMessage', '');
      } catch (error) {
        commit('setErrorMessage', error.response.data.message || error.message);
      }
    },
    async validateUser({ state, commit }) {
      try {
        const data = await axios.get(VALIDATE_USER_URL, {
          headers: {
            Authorization: `Bearer ${state.user?.token}`
          }
        });
        commit('setLoggedIn', data.data);
      } catch (error) {
        commit('setLoggedIn', false);
      }
    }
  }
};

export default authModule;
