<style>
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
  <div class="sign-up">
    <div class="jumbotron jumbotron-fluid py-4 mt-4">
      <h1 class="display-4">Login</h1>
      <div v-if="errorMessage" class="alert alert-danger mt-4" role="alert">
        {{ errorMessage }}
      </div>

      <form data-bitwarden-watching="1" @submit.prevent="login">
        <fieldset>
          <div class="form-group">
            <label class="form-label mt-4">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter Your Username"
              required
              v-model="user.username"
            />
            <small id="usernameHelp"
              >Username must be at longer than 3 characters and shorter than 30.
              Usernames can contain alphanumeric characters and
              underscores.</small
            >
          </div>
          <div class="form-group">
            <label class="form-label mt-4">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              aria-describedby="passwordHelp"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <small id="passwordHelp"
              >Password must be at least 6 characters long.</small
            >
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-4 submit-btn"
            :disabled="logginIn"
          >
            Login
            <img
              src="../assets/loading.svg"
              alt="Loading"
              class="loading-icon"
              v-if="logginIn"
            />
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';

const schema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
  confirmPassword: Joi.string()
    .trim()
    .min(6)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
});

export default {
  name: 'LoginView',
  data: () => ({
    errorMessage: '',
    logginIn: false,
    user: {
      username: '',
      password: ''
    }
  }),
  methods: {
    login() {
      this.errorMessage = '';
      this.logginIn = true;

      const { user } = this;

      if (this.validUser()) {
        const body = { username: user.username, password: user.password };

        fetch(LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }

            return res.json().then((err) => {
              throw new Error(err.message);
            });
          })
          .then((res) => {
            this.logginIn = false;
            localStorage.setItem('token', res.token);
            this.$router.push('/dashboard');
          })
          .catch((err) => {
            this.logginIn = false;
            this.errorMessage = err.message;
          });
      }
    },
    validUser() {
      const { error } = schema.validate(this.user);

      if (error) {
        if (error.message.includes('username')) {
          this.errorMessage = 'Username is invalid.';
        } else {
          this.errorMessage = 'Password is invalid.';
        }
        return false;
      }

      return true;
    }
  }
};
</script>
