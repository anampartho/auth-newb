<template>
  <div class="home">
    <div class="jumbotron jumbotron-fluid py-4 mt-4">
      <h1 class="display-4">🔐 This is Auth for Newbs</h1>
      <p class="lead">
        Welcome to this site where we implement authentication and authorization
        from scratch.
      </p>
      <p class="lead mt-4">
        <router-link
          :to="{ name: 'signup' }"
          class="btn btn-primary btn-lg"
          role="button"
          >Sign Up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView'
};
</script>
