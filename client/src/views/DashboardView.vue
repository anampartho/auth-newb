<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.add-new-note {
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
}
</style>
<template>
  <div class="dashboard">
    <div class="jumbotron jumbotron-fluid py-4 mt-4">
      <h1 class="display-4">Dashboard</h1>
      <p class="lead" v-if="user.username">
        Welcome <strong>{{ user?.username }} 👋</strong>
      </p>
      <p class="lead mt-4">
        <a
          class="btn btn-primary btn-lg"
          role="button"
          @click.prevent="logout"
          @keydown.prevent="logout"
          tabindex="0"
          >Logout</a
        >
      </p>
    </div>
    <div class="container">
      <div class="row">
        <h2 class="display-6 mt-4 p-0">Your Notes</h2>
      </div>
      <div class="row card-grid">
        <div class="card p-0" v-for="note in notes" :key="note._id">
          <div class="card-header">{{ note.title }}</div>
          <div class="card-body">
            <p class="card-text">
              {{ note.description }}
            </p>
          </div>
        </div>
        <a
          class="card text-white bg-primary p-0 add-new-note"
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
          @click.prevent="goToAddNote()"
          @keydown.prevent="goToAddNote()"
        >
          ADD NEW NOTE
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = 'http://localhost:5000';
const NOTES_URL = 'http://localhost:5000/api/v1/notes';

export default {
  name: 'DashboardView',
  data: () => ({
    user: {},
    notes: []
  }),
  mounted() {
    fetch(API_URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        if (res.user) {
          this.user = res.user;
          this.getNotes();
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    goToAddNote() {
      this.$router.push('/notes/add');
    },
    getNotes() {
      fetch(NOTES_URL, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.notes = res;
        });
    }
  }
};
</script>
