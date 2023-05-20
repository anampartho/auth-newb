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
.progress {
  height: 5px;
  border-radius: 0;
  margin-top: 10px;
}
</style>
<template>
  <div class="sign-up">
    <div class="jumbotron jumbotron-fluid py-4 mt-4">
      <h1 class="display-4">Sign Up</h1>
      <div v-if="errorMessage" class="alert alert-danger mt-4" role="alert">
        {{ errorMessage }}
      </div>
      <form data-bitwarden-watching="1" @submit.prevent="submitHandler">
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
          <div class="row">
            <div class="form-group col-md-6">
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

              <div class="progress">
                <div
                  class="progress-bar"
                  :class="{
                    'bg-danger': passwordStrengthPercentage <= 25,
                    'bg-warning': passwordStrengthPercentage <= 50,
                    'bg-info': passwordStrengthPercentage <= 75,
                    'bg-success': passwordStrengthPercentage > 75
                  }"
                  role="progressbar"
                  :style="{
                    width: passwordStrengthPercentage + '%'
                  }"
                  :aria-valuenow="passwordStrengthPercentage"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label class="form-label mt-4">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                aria-describedby="confirmPasswordHelp"
                placeholder="Confirm Password"
                required
                v-model="user.confirmPassword"
              />
              <small id="confirmPasswordHelp"
                >Please confirm your password</small
              >
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-4 submit-btn"
            :disabled="signingUp"
          >
            Sign Up
            <img
              src="../assets/loading.svg"
              alt="Loading"
              class="loading-icon"
              v-if="signingUp"
            />
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations, mapState } from 'vuex';
import Joi from 'joi';
import { passwordStrength as checkPasswordStrength } from 'check-password-strength';

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
  name: 'SignUpView',
  data: () => ({
    signingUp: false,
    user: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    passwordStrength: null,
    passwordStrengthPercentage: 0
  }),
  computed: {
    ...mapState('auth', ['errorMessage', 'loggedIn'])
  },
  watch: {
    user: {
      handler(change) {
        this.setErrorMessage('');
        if (change.password.length) {
          this.passwordStrength = checkPasswordStrength(this.user.password);
        } else {
          this.passwordStrength = null;
        }
      },
      deep: true
    },
    passwordStrength: {
      handler() {
        this.passwordStrengthPercentage = this.passwordStrength
          ? (this.passwordStrength.id + 1) * 25
          : 0;
      }
    },
    loggedIn: {
      handler() {
        if (this.loggedIn) {
          this.$router.push('/dashboard');
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('auth', ['signUp']),
    ...mapMutations('auth', ['setErrorMessage']),
    submitHandler() {
      this.signingUp = true;
      const { user } = this;

      if (this.validUser()) {
        const body = {
          username: user.username,
          password: user.password
        };

        this.signUp(body);
      }
      this.signingUp = false;
    },
    validUser() {
      const { user } = this;
      if (user.password !== user.confirmPassword) {
        this.setErrorMessage('Both passwords must match.');
        return false;
      }

      const { error } = schema.validate(this.user);

      if (error) {
        if (error.message.includes('username')) {
          this.setErrorMessage('Username is invalid.');
        } else {
          this.setErrorMessage('Password is invalid.');
        }
        return false;
      }

      return true;
    }
  }
};
</script>
