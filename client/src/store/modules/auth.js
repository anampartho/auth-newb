import axios from 'axios';
import { LOGIN_URL, SIGNUP_URL } from '@/config/api-urls';

const authModule = {
  namespaced: true,
  state() {
    return {
      user: null,
      errorMessage: ''
    };
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
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
    }
  }
};

export default authModule;
