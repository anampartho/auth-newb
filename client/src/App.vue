<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand" href="#"
          >Auth for Newbs
          <span v-if="loggedIn"> | {{ user.username }}</span></router-link
        >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              :to="{ name: 'signup' }"
              v-if="!loggedIn"
              >Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              :to="{ name: 'login' }"
              v-if="!loggedIn"
              >Log In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              :to="{ name: 'dashboard' }"
              v-if="loggedIn"
              >Dashboard
              <span class="visually-hidden">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              v-if="loggedIn"
              @click.prevent="logout"
              @keydown.prevent="logout"
              >Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="container" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['user', 'loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['validateUser', 'logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/login');
    }
  },
  watch: {
    user: {
      handler() {
        this.validateUser();
      },
      deep: true
    }
  },
  beforeMount() {
    this.validateUser();
  }
};
</script>
