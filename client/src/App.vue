<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand" href="#"
          >Auth for Newbs</router-link
        >
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
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['validateUser'])
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
