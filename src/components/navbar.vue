<template>
  <div class="dropdown mt-3 border-bottom">
    <button
      class="btn btn-light dropdown-toggle"
      type="button"
      id="menu-dropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Menu
    </button>
    <ul class="dropdown-menu" aria-labelledby="menu-dropdown">
      <li>
        <router-link to="/search" class="dropdown-item">Home</router-link>
      </li>
      <li>
        <router-link to="/add-patient" class="dropdown-item">
          Add Patient
        </router-link>
      </li>
      <li>
        <router-link to="/patients" class="dropdown-item">
          All Patients
        </router-link>
      </li>
      <li>
        <router-link to="/" class="dropdown-item">
          <span class="text-danger">logout</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "fhir-navbar",
};
</script>

<style scoped>
#menu-dropdown {
  border-radius: 0 !important;
  border: 1px solid lightgrey;
}
</style>
