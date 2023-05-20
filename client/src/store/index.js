import { createStore } from 'vuex';
import createPersistedState from 'vuex-plugin-persistedstate';
import authModule from './modules/auth';

const store = createStore({
  modules: {
    auth: authModule
  },
  plugins: [createPersistedState()]
});

export default store;
