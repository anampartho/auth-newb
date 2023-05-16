<template>
  <div class="sign-up">
    <div class="jumbotron jumbotron-fluid py-4 mt-4">
      <h1 class="display-4">Sign Up</h1>
      <form data-bitwarden-watching="1">
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
              />
              <small id="passwordHelp"
                >Password must be at least 6 characters long.</small
              >
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
              />
              <small id="confirmPasswordHelp"
                >Please confirm your password</small
              >
            </div>
          </div>

          <button type="submit" class="btn btn-primary mt-4">Sign Up</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SignUpView'
};
</script>
