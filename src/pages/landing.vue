<template>
  <div class="container-fluid">
    <div class="row full-height">
      <div class="col-6 d-flex align-items-center justify-content-center">
        <img src="@/assets/blue_logo.png" class="w-100" alt="logo" />
      </div>
      <div class="col-6 d-flex align-items-center justify-content-center">
        <form id="auth-card" class="card p-4">
          <h4>Sign In</h4>
          <div class="form-group mb-3">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group mb-3">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Remember me</label
            >
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @click="$router.push('/search')"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
