<template>
  <div class="container-fluid">
    <fhir-navbar></fhir-navbar>
    <div
      class="row half-height d-flex justify-content-center align-items-center"
    >
      <form class="col-4" @submit.prevent="onSearch">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </span>
          <input
            v-model="searchTerm"
            class="form-control"
            placeholder=""
            aria-label="search"
            aria-describedby="search"
          />
        </div>
        <div class="col-6 offset-3 d-grid mt-4">
          <button class="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push("/results/" + this.searchTerm);
    },
  },
};
</script>

<style></style>
