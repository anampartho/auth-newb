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
