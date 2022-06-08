<template>
  <div class="container-fluid">
    <fhir-navbar></fhir-navbar>
    <form @submit.prevent="onSearch" class="row mt-5">
      <div class="col-4 offset-3">
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
      </div>
      <div class="col-2 d-grid">
        <button class="btn btn-primary">Search</button>
      </div>
    </form>
    <div class="row mt-4">
      <div class="col-8 offset-2">
        <table v-if="!isLoading" class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Sex</th>
              <th scope="col">Age</th>
              <th scope="col">Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(patient, i) in patients" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>
                {{ patient.resource.name | getName }}
              </td>
              <td>{{ patient.resource.gender || "N/A" }}</td>
              <td>
                {{ patient.resource.birthDate | calculateAge }}
                <span v-if="patient.resource.birthDate"> yrs old</span>
              </td>
              <td>{{ patient.resource.telecom | getPhone }}</td>
              <td
                class="d-grid"
                @click="
                  $router.push('/patient/' + getPatientId(patient.fullUrl))
                "
              >
                <button class="btn btn-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-up-right-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "results",
  data() {
    return {
      patients: [],
      isLoading: false,
      searchTerm: "",
    };
  },
  created() {
    this.fetchResults();
  },
  methods: {
    async fetchResults() {
      const response = await this.$axios.get("/Patient");
      console.log("results after fetching all patients:", response.data);
      this.patients = response.data.entry;
    },
    getPatientId(fullUrl) {
      console.log(fullUrl);
      const termsArray = fullUrl.split("/");
      const patientId = termsArray[termsArray.length - 1];
      return patientId;
    },
    onSearch() {
      if (this.searchTerm.length < 1) return;
      this.$router.push("/results/" + this.searchTerm);
    },
  },
};
</script>

<style></style>
