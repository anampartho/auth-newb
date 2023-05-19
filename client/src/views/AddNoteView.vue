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

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-icon {
  height: 21px;
  width: auto;
}
</style>
<template>
  <div class="dashboard">
    <div class="jumbotron jumbotron-fluid py-4 mt-4">
      <h1 class="display-4">Add a new Note</h1>
      <div v-if="errorMessage" class="alert alert-danger mt-4" role="alert">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success mt-4" role="alert">
        {{ successMessage }}
      </div>
      <!-- <p class="lead mt-4">
        <a
          class="btn btn-primary btn-lg"
          role="button"
          @click.prevent="logout"
          @keydown.prevent="logout"
          tabindex="0"
          >Logout</a
        >
      </p> -->

      <form data-bitwarden-watching="1" @submit.prevent="addNote">
        <fieldset>
          <div class="form-group">
            <label class="form-label mt-4">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Title"
              aria-describedby="noteTitleHelp"
              v-model="note.title"
              required
            />
            <small id="noteTitleHelp"
              >Add a descriptive title for your note.</small
            >
          </div>

          <div class="form-group">
            <label class="form-label mt-4">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Description"
              aria-describedby="noteDescriptionHelp"
              v-model="note.description"
              required
            />
            <small id="noteDescriptionHelp"
              >Add a description of your note.</small
            >
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-4 submit-btn"
            :disabled="addingNote"
          >
            Add Note
            <img
              src="../assets/loading.svg"
              alt="Loading"
              class="loading-icon"
              v-if="addingNote"
            />
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = 'http://localhost:5000';
const NOTES_URL = 'http://localhost:5000/api/v1/notes';

export default {
  name: 'AddNotesView',
  data: () => ({
    errorMessage: '',
    successMessage: '',
    note: {
      title: '',
      description: ''
    },
    addingNote: false
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
        if (res.user) {
          this.user = res.user;
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
    addNote() {
      const { note } = this;
      this.addingNote = true;
      const body = {
        title: note.title,
        description: note.description
      };

      fetch(NOTES_URL, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then(() => {
          this.note = {
            title: '',
            description: ''
          };
          this.successMessage = 'Note added successfully!';
          this.addingNote = false;

          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        });
    }
  }
};
</script>
