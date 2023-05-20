<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
      <p class="lead" v-if="user?.username">
        Welcome <strong>{{ user?.username }} 👋</strong>
      </p>
    </div>
    <div class="container">
      <div class="row">
        <h2 class="display-6 mt-4 p-0">
          Your Notes
          <a
            class="btn btn-primary"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            @click.prevent="goToAddNote()"
            @keydown.prevent="goToAddNote()"
          >
            ADD NEW NOTE
          </a>
        </h2>
      </div>
      <div class="row card-grid">
        <div class="card p-0" v-for="note in notes" :key="note._id">
          <div class="card-header">{{ note.title }}</div>
          <div class="card-body">
            <p class="card-text" v-html="renderMarkdown(note.description)"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MDEmoji from 'markdown-it-emoji';
import { mapActions, mapState } from 'vuex';
import { NOTES_BASE_URL } from '@/config/api-urls';

export default {
  name: 'DashboardView',
  data: () => ({
    notes: []
  }),
  computed: {
    ...mapState('auth', ['user', 'loggedIn'])
  },
  mounted() {
    if (this.loggedIn) {
      this.getNotes();
    } else {
      this.logout();
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/login');
    },
    goToAddNote() {
      this.$router.push('/notes/add');
    },
    async getNotes() {
      try {
        const data = await axios.get(NOTES_BASE_URL, {
          headers: { Authorization: `Bearer ${this.user.token}` }
        });
        this.notes = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    renderMarkdown(text) {
      const md = new MarkdownIt();
      md.use(MDEmoji);

      return md.render(text);
    }
  }
};
</script>
