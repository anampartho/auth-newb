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
import axios from 'axios';
import { NOTES_BASE_URL } from '@/config/api-urls';
import { mapState } from 'vuex';

// @ is an alias to /src

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
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async addNote() {
      const { note } = this;
      this.addingNote = true;
      const body = {
        title: note.title,
        description: note.description
      };

      try {
        await axios.post(NOTES_BASE_URL, body, {
          headers: {
            Authorization: `Bearer ${this.user.token}`
          }
        });

        this.note = {
          title: '',
          description: ''
        };

        this.successMessage = 'Note added successfully!';
        this.addingNote = false;

        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response.data.message || error.message;
      }
    }
  }
};
</script>
